const functions = require('@google-cloud/functions-framework');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const lighthouse = require('@lighthouse-web3/sdk');

const { tmpdir } = require('os');
const { join } = require('path');
const { v4: uuidv4 } = require('uuid');

const APIKEY = "46e684db.0bac3e24720c465abc77202340af7089";
const MAX_DIMENSION = 1024;

function resizeImage(img) {
    const originalWidth = img.width;
    const originalHeight = img.height;

    let scaleFactor = 1;

    // Calculate the scaling factor based on the longest side
    if (originalWidth > originalHeight && originalWidth > MAX_DIMENSION) {
        scaleFactor = MAX_DIMENSION / originalWidth;
    } else if (originalHeight > originalWidth && originalHeight > MAX_DIMENSION) {
        scaleFactor = MAX_DIMENSION / originalHeight;
    }

    const scaledWidth = originalWidth * scaleFactor;
    const scaledHeight = originalHeight * scaleFactor;

    return { scaledWidth, scaledHeight };
}

// Helper function to add a watermark
async function addWatermarkToImage(imageBuffer, watermarkText) {
    try {
        const img = await loadImage(imageBuffer);

        const { scaledWidth, scaledHeight } = resizeImage(img);
        
        const canvas = createCanvas(scaledWidth, scaledHeight);
        const ctx = canvas.getContext('2d');

        // Draw the original image scaled down
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        ctx.font = '20px';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.textAlign = 'center';

        const textWidth = ctx.measureText(watermarkText).width;
        const diagonalGap = 50;
        const rotationAngle = -45 * Math.PI / 180;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotationAngle);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        for (let y = -canvas.height; y < canvas.height * 2; y += diagonalGap) {
            const rowOffset = (y / diagonalGap) % 2 === 0 ? 0 : textWidth / 2;
            for (let x = -canvas.width; x < canvas.width * 2; x += textWidth + diagonalGap) {
                ctx.fillText(watermarkText, x + rowOffset, y);
            }
        }

        return canvas.toBuffer('image/jpeg', { quality: 0.5 });
    } catch (error) {
        throw new Error('Error applying watermark: ' + error.message);
    }
}

async function uploadToLighthouse(filePath) {
    try {
        const response = await lighthouse.upload(filePath, APIKEY);
        return response.data.Hash;
    } catch (error) {
        throw new Error('Error uploading to Lighthouse: ' + error.message);
    }
}

functions.http('helloHttp', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    try {
        if (req.method !== 'PUT') {
            return res.status(405).send('Only PUT requests are allowed.');
        }

        const watermarkText = 'Shutter';
        const tempDir = tmpdir();
        const originalImagePath = join(tempDir, `${uuidv4()}_original.jpeg`);
        const watermarkedImagePath = join(tempDir, `${uuidv4()}_watermarked.jpeg`);

        // Save original image temporarily
        fs.writeFileSync(originalImagePath, req.body);

        // Load and resize the original image
        const img = await loadImage(req.body);
        const { scaledWidth, scaledHeight } = resizeImage(img);

        const canvas = createCanvas(scaledWidth, scaledHeight);
        const ctx = canvas.getContext('2d');

        // Draw the resized image onto the canvas
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
        const resizedImageBuffer = canvas.toBuffer('image/jpeg', { quality: 0.5 });

        // Apply watermark
        const watermarkedImageBuffer = await addWatermarkToImage(resizedImageBuffer, watermarkText);

        // Save resized and watermarked images temporarily
        fs.writeFileSync(originalImagePath, resizedImageBuffer);
        fs.writeFileSync(watermarkedImagePath, watermarkedImageBuffer);

        // Upload original image to Lighthouse
        const originalImageHash = await uploadToLighthouse(originalImagePath);

        // Upload watermarked image to Lighthouse
        const watermarkedImageHash = await uploadToLighthouse(watermarkedImagePath);

        // Respond with the hashes of both images
        res.status(200).json({
            originalImageHash,
            watermarkedImageHash
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the image: ' + error.message);
    }
  }
});

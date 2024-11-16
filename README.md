![Group 112](https://github.com/user-attachments/assets/0831d1d3-0db9-43f7-8629-c397acaa5644)


Radii (**Recursive Ad Incentivise Interaction**) is a fully decentralized, on-chain advertising platform designed to incentivize all participants—**Advertisers**, **Partners**, and **Users**. The platform leverages users' on-chain data to display targeted ads on websites and blogs, ensuring equitable ad revenue distribution. It is akin to Google AdSense but operates entirely on blockchain technology, providing transparency, decentralization, and fairness.  

## How It Works  

Radii connects advertisers, publishers, and users in a seamless decentralized ecosystem:  
1. **Advertisers** upload their ads, paying a fee to the Radii platform.  
2. **Partners/Publishers** showcase these ads on their websites or blogs.  
3. **Users** interact with ads and receive incentives for their participation.

![persona](https://github.com/user-attachments/assets/305a3354-d393-4b73-ac7e-013e5b8df494)

Revenue from advertisements is distributed among:  
- **Partners** for hosting ads.  
- **Users** for engaging with ads.  
- **The Radii platform** for operational and development costs.  

## Dashboard Features  

The Radii platform offers three dashboards tailored for different stakeholders:  

### 1. **Advertisers**  
- **Create and Manage Campaigns**: Upload ad content and define target audience parameters.  
- **Analytics Dashboard**: View detailed performance metrics (click-through rates, impressions, audience engagement).  
- **Budget Management**: Monitor and adjust campaign budgets.  

### 2. **Partners/Publishers**  
- **Ad Integration**: Simple tools to embed ads on websites or blogs.  
- **Revenue Analytics**: Real-time tracking of earnings from ad hosting.  
- **Content Customization**: Select ad categories to match site content.  

### 3. **Users**  
- **Interaction Rewards**: Track points or tokens earned by interacting with ads.  
- **Redemption Options**: Redeem tokens for stablecoins or vouchers from partner stores.  
- **Privacy Controls**: Manage data-sharing preferences.  

## Incentivization Model  

Radii ensures transparent and equitable distribution of ad revenue:  
- **Partners**: Earn a share of ad revenue for hosting ads on their platforms.  
- **Users**: Receive rewards (tokens) for engaging with ads.  
- **Advertisers**: Gain insights into ad performance and reach a decentralized audience.  

![Revenue](https://github.com/user-attachments/assets/83054e7e-aa3d-47c2-8b0a-b30258dac8ed)

## Integration  

### **For Advertisers**  
Advertisers can use Radii to upload ads and reach targeted audiences through partnered websites. Our AI-based tagging and search algorithms ensure precise targeting.  

### **For Partners**  
Publishers can integrate ads into their platforms by embedding the Radii widget, which connects to the on-chain advertising ecosystem. Revenue sharing is automated and transparent.  

### **For Users**  
Users interact with ads through a seamless and gamified experience, earning rewards directly credited to their wallets.  

## Technology Stack  

### **1. Smart Contracts**  
All transactions, including ad payments and revenue distribution, are powered by secure and transparent smart contracts.  

### **2. The Graph**  
Radii uses **The Graph** for indexing and querying on-chain data, ensuring efficient and reliable access to user and ad profiles.  

### **3. AI Algorithms**  
AI-driven algorithms extract metadata from ad content to tag and match ads with relevant audiences.  

### **4. Paymaster Solutions**  
Transaction fees are sponsored by the platform using **Coinbase Paymaster**, ensuring a smooth, gasless experience for users.  

### **5. Decentralized Storage**  
Ad assets and related metadata are stored using **IPFS**, ensuring high availability and transparency.  

## Example API Usage  

### **Adding a Tag for a User**  

```javascript
axios.get('https://radii-api.functions.app', {
    params: {
        wallet: "<user_wallet_address>",
        tags: "<tag1,tag2>",
        api_key: "appkey_testnet"
    }
});
```  

### **Fetching Tags**  

```graphql
query FetchTags {
  tagAddeds(where: {tag_in: ["meme", "defi", "RWA"]}) {
    wallet
    tags
  }
}
```  

Endpoint: `https://api.studio.thegraph.com/proxy/radii/v0.1/graphql`  

## Future Roadmap  

1. **Enhanced SDK**: Provide developers with a robust SDK for seamless integration with Radii.  
2. **Advanced Analytics**: Introduce predictive analytics for advertisers and publishers.  
3. **Gamified User Rewards**: Expand redemption options to include exclusive NFT drops and loyalty benefits.  
4. **Scalability**: Optimize the platform for higher transaction volumes.  

## Notes  

- Radii is committed to fostering transparency and decentralization in digital advertising.  
- We encourage collaboration with developers, publishers, and advertisers to expand the Radii ecosystem.  

Explore Radii, where decentralized advertising meets incentivized engagement!  

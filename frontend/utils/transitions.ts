import { Contract, JsonRpcSigner, parseEther, parseUnits } from "ethers";
import { RADII_ABI, RADII_CONTRACT } from "./consts";

const getRadiiContract = (signer: JsonRpcSigner) => {
  return new Contract(RADII_CONTRACT, RADII_ABI, signer);
};

export const addTagsToProfile = async (
  tags: number[],
  signer: JsonRpcSigner
) => {
  const RadiiFHE = getRadiiContract(signer);
  const resp = await RadiiFHE.addTagsToProfile(tags);
  console.log(resp);
  return resp;
};

export const getAdvertiserInfo = async (
  address: string,
  signer: JsonRpcSigner
) => {
  const RadiiFHE = getRadiiContract(signer);
  const resp = await RadiiFHE.Advertisers(address);
  return {
    advertiser: resp.advertiser,
    verificationLevel: Number(resp.verificationLevel),
  };
};

export const getTagsForProfile = async (signer: JsonRpcSigner) => {
  const RadiiFHE = getRadiiContract(signer);
  const resp = await RadiiFHE.getTagsForProfile();
  return resp.map(Number);
};

export const purchaseAdvert = async (
  contentId: string,
  tagsTargeted: number[],
  viewCount: number,
  value: bigint,
  signer: JsonRpcSigner
) => {
  const RadiiFHE = getRadiiContract(signer);

  const resp = await RadiiFHE.purchaseAdvert(
    contentId,
    tagsTargeted,
    viewCount,
    { value }
  );
  console.log(resp);
  return resp;
};

export const removeTagsFromProfile = async (
  tags: number[],
  signer: JsonRpcSigner
) => {
  const RadiiFHE = getRadiiContract(signer);
  const resp = await RadiiFHE.removeTagsFromProfile(tags);
  console.log(resp);
  return resp;
};

export const getAdsPurchased = async (signer: JsonRpcSigner) => {
  const RadiiFHE = getRadiiContract(signer);
  const resp = await RadiiFHE.getAllAdsForAdvertiser();
  return resp;
}

export const verifyOrbAndExecute = async (
  signal: string,
  root: bigint,
  nullifierHash: bigint,
  proof: bigint[],
  signer: JsonRpcSigner
) => {
  const RadiiFHE = getRadiiContract(signer);
  const resp = await RadiiFHE.verifyOrbAndExecute(
    signal,
    root,
    nullifierHash,
    proof
  );
  console.log(resp);
  return resp;
};

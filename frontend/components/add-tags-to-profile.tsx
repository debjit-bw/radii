"use client";

// import { random } from "@/utils/functions";
import { getSigner, getWeb3Provider } from "@dynamic-labs/ethers-v6";
import { useDynamicContext, useUserWallets } from "@dynamic-labs/sdk-react-core";
import React from "react";
import { Button } from "@/ui/button";
import { Contract } from "ethers";
import { RADII_FHE_ABI } from "@/utils/consts";
import { FhenixClient, getPermit } from "fhenixjs";

const FHE_CONTRACT = "0xeA750be706bEecFF43742D8A5Aa0Af6821694cA9";

const AddTagsToProfile = () => {
  const { primaryWallet } = useDynamicContext();
  const userWallets = useUserWallets();

  const allSet = async (): Promise<boolean> => {
    if (!primaryWallet) {
      console.error("No primary wallet connected");
      return false;
    }
    if (userWallets.length === 0) {
      console.error("No wallets connected");
      return false;
    }
    await primaryWallet.switchNetwork(421614);
    return true;
  };

  // const fetchTagsForProfile = async () => {
  //   return 0;
  // }

  const fetchTagsForProfile = async () => {
    if (!(await allSet())) {
      // setLoading(false);
      return;
    }

    const signer = await getSigner(primaryWallet!);
    // const Radii = new Contract("0xeA750be706bEecFF43742D8A5Aa0Af6821694cA9", RADII_FHE_ABI, signer);

    if (true) {
      await primaryWallet?.switchNetwork(8008148);
      while (true) {
        if ((await primaryWallet?.getNetwork()) === 8008148) {
          break;
        }
      }
      const provider = await getWeb3Provider(primaryWallet!);
      const client = new FhenixClient({ provider });
      const RadiiFHE = new Contract("0xeA750be706bEecFF43742D8A5Aa0Af6821694cA9", RADII_FHE_ABI, signer);

      const permit = await getPermit("0xeA750be706bEecFF43742D8A5Aa0Af6821694cA9", provider);
      if (!permit) {
        console.error("Permit not found");
        return;
      }
      const permission = client.extractPermitPermission(permit);

      const getTags = await RadiiFHE.fetchTagsForProfile(
        "0x0ccdD4cAf542282a020eA455ABe0EdFE96876322",
        0,
        permission.publicKey
      );

      const t1 = client.unseal(FHE_CONTRACT, getTags[0]);
      const t2 = client.unseal(FHE_CONTRACT, getTags[1]);
      const t3 = client.unseal(FHE_CONTRACT, getTags[2]);
      const t4 = client.unseal(FHE_CONTRACT, getTags[3]);
      const t5 = client.unseal(FHE_CONTRACT, getTags[4]);

      console.log(">>> TAGS <<<");
      console.log(t1, t2, t3, t4, t5);
    }
  }

  return (
    <div>
      <Button size="sm" onClick={async () => await fetchTagsForProfile()}>
        Click me
      </Button>
    </div>
  );
};

export default AddTagsToProfile
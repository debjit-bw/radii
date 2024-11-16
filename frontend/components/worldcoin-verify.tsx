"use client";

import React from "react";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
  useIDKit,
} from "@worldcoin/idkit";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getSigner } from "@dynamic-labs/ethers-v6";
import { Contract } from "ethers";
import {
  ORB_VERIFICATION,
  RADII_ABI,
  RADII_CONTRACT,
  WORLD_ID_APP_ID,
} from "@/utils/consts";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/ui/button";

const WorldcoinVerify: React.FC = () => {
  const { primaryWallet } = useDynamicContext();
  const { isDynamicLoggedIn, setIsWorldcoinVerified } = useAuth();
  const { setOpen } = useIDKit();

  const verifyProof = async (proof: any) => {
    if (ORB_VERIFICATION && primaryWallet && isDynamicLoggedIn) {
      try {
        const signer = await getSigner(primaryWallet);
        const Radii = new Contract(RADII_CONTRACT, RADII_ABI, signer);

        const tx = await Radii.verifyOrbAndExecute(
          await signer.getAddress(),
          proof.merkle_root,
          proof.nullifier_hash,
          proof.proof
        );
        await tx.wait();
      } catch (error) {
        console.error("Error verifying proof:", error);
        throw error;
      }
    }
  };

  const onSuccess = (result: ISuccessResult) => {
    setIsWorldcoinVerified(true);
  };

  const verifyWorldcoin = () => {
    if (!isDynamicLoggedIn) {
      return;
    }

    setIsWorldcoinVerified(true);
  };

  if (!isDynamicLoggedIn) {
    setOpen(false);
    return null;
  }

  return (
    <>
      <IDKitWidget
        app_id={WORLD_ID_APP_ID}
        action="radii/verification"
        verification_level={VerificationLevel.Device}
        handleVerify={verifyProof}
        onSuccess={onSuccess}
      />
      <Button variant="primary" onClick={verifyWorldcoin}>
        Verify with World ID
      </Button>
    </>
  );
};

export default WorldcoinVerify;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supportApi } from "../../../api/support";
import * as S from "./style";
const CurrentSupportList = () => {
  const [result, setResult] = useState([]);
  const handleGetRecentSupportList = async () => {
    try {
      const { data } = await supportApi.getSponsorshipList();
      setResult(data);
    } catch (error) {
      // 사용자 제공 x
      console.log("[Intro] Recent supportList Error", error);
    }
  };

  useEffect(() => {
    handleGetRecentSupportList();
  }, []);

  return (
    <S.CurrentSupportList>
      <S.Track>
        <div className="content">
          <>
            &nbsp;<S.DateTime>Mar 23 2023</S.DateTime>
            <S.Separator />
            &nbsp;<S.SupportType>WISHLIST</S.SupportType>
            <S.Separator />
            &nbsp;
            <S.Price>
              3.00 <S.Unit>MATIC</S.Unit>
            </S.Price>
          </>
          <>
            &nbsp;<S.DateTime>Mar 23 2023</S.DateTime>
            <S.Separator />
            &nbsp;<S.SupportType>DONATION</S.SupportType>
            <S.Separator />
            &nbsp;
            <S.Price>
              13.00 <S.Unit>MATIC</S.Unit>
            </S.Price>
          </>
          <>
            &nbsp;<S.DateTime>Mar 23 2023</S.DateTime>
            <S.Separator />
            &nbsp;<S.SupportType>ITEMS</S.SupportType>
            <S.Separator />
            &nbsp;
            <S.Price>
              4.00 <S.Unit>MATIC</S.Unit>
            </S.Price>
          </>
        </div>
      </S.Track>
    </S.CurrentSupportList>
  );
};
export default CurrentSupportList;

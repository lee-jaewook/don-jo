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
      console.log("[Intro] handleGetRecentSupportList()... ", error);
    }
  };

  useEffect(() => {
    handleGetRecentSupportList();
  }, []);

  return (
    <S.CurrentSupportList>
      <S.Track>
        <div className="content">
          {result &&
            result.length > 0 &&
            result.map((item, index) => (
              <div key={index}>
                &nbsp;
                <S.DateTime>
                  {new Date(item.arriveTimeStamp).toDateString()}
                </S.DateTime>
                <S.Separator />
                &nbsp;
                <S.SupportType>{item.supportType.toUpperCase()}</S.SupportType>
                <S.Separator />
                &nbsp;
                <S.Price>
                  {item.amount} <S.Unit>MATIC</S.Unit>
                </S.Price>
              </div>
            ))}
        </div>
      </S.Track>
    </S.CurrentSupportList>
  );
};
export default CurrentSupportList;

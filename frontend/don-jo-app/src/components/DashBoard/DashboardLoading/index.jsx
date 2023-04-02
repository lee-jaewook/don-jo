import React from "react";
import * as S from "./style";
import { PulseLoader } from "react-spinners";

const DashboardLoading = () => (
  <S.LoadingWrapper>
    <PulseLoader color="var(--color-primary)" />
  </S.LoadingWrapper>
);

export default DashboardLoading;

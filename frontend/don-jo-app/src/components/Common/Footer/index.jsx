import React from "react";
import * as S from "./style";
import Logo from "../../../assets/img/common/app-logo-white.svg";

const Footer = () => {
  //
  return (
    <S.FooterWrapper>
      <S.Container>
        <S.LineAbove>
          <S.PartWrapper>
            <S.ServiceTitle>DON-JO</S.ServiceTitle>
            <S.ServiceDescription>
              DONJO is a blockchain-based creator sponsorship and creation
              trading service. If the creation posted by the creator was
              helpful, you can express your gratitude through sponsorship.
            </S.ServiceDescription>
          </S.PartWrapper>
          <S.PartWrapper>
            <S.Part>Back-End</S.Part>
            <S.PersonWrapper>
              <S.Person>
                <S.Link href="/jaewook">Jaewook Lee</S.Link>
              </S.Person>
              <S.Person>
                <S.Link href="/sun">Taesun Kang</S.Link>
              </S.Person>
              <S.Person>
                <S.Link href="/lyy0000">Yooyoung Lee</S.Link>
              </S.Person>
            </S.PersonWrapper>
          </S.PartWrapper>
          <S.PartWrapper>
            <S.Part>Front-End</S.Part>
            <S.PersonWrapper>
              <S.Person>
                <S.Link href="/songo427">Hyunju Song</S.Link>
              </S.Person>
              <S.Person>
                <S.Link href="/hyunsu">Hyunsu Kim</S.Link>
              </S.Person>
              <S.Person>
                <S.Link href="/taebong">Taehyun An</S.Link>
              </S.Person>
            </S.PersonWrapper>
          </S.PartWrapper>
        </S.LineAbove>
        <S.Line />
        <S.LineUnder>
          © 2023 • Don-Jo
          <S.Logo src={Logo} />
        </S.LineUnder>
      </S.Container>
    </S.FooterWrapper>
  );
};

export default Footer;

import React, { useRef } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicModal from "../../Common/Modal/BasicModal";
import { QRCode } from "react-qrcode-logo";
import BasicButton from "../../Common/BasicButton";
import { toPng } from "html-to-image";
import Logo from "../../../assets/img/dashboard/qr-logo.svg";
import { useSelector } from "react-redux";

const QRCodeModal = ({ handleSetShowModal }) => {
  const ref = useRef(null);
  const pageName = useSelector((state) => state.member.pageName);

  const handleOnClickDownloadButton = () => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `QR-Code.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.log(
          "[Dashboard - QR Modal] handleOnClickDownloadButton()...",
          error
        );
      });
  };

  return (
    <BasicModal handleSetShowModal={handleSetShowModal} width={1}>
      <S.Content>
        <div ref={ref}>
          <QRCode
            value={`https://j8a209.p.ssafy.io/${pageName}`}
            size="200"
            fgColor="#222"
            logoWidth="48"
            quietZone={10}
            qrStyle="dots"
            eyeRadius={10}
            enableCORS={true}
            logoImage={Logo}
            logoPaddingStyle={"square"}
            removeQrCodeBehindLogo={true}
          />
        </div>
        <S.ButtonWrapper>
          <BasicButton
            color="var(--color-primary)"
            isBackground={true}
            text="Download"
            handleOnClickButton={handleOnClickDownloadButton}
          />
        </S.ButtonWrapper>
      </S.Content>
    </BasicModal>
  );
};

export default QRCodeModal;

QRCodeModal.propTypes = {
  handleSetShowModal: PropTypes.func.isRequired,
};

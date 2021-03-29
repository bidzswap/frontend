import "./Risk.scss"

import React, { ReactElement } from "react"

import Footer from "../components/Footer"
import TopMenu from "../components/TopMenu"

import { useTranslation } from "react-i18next"

function Risk(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="riskpage">
      <TopMenu activeTab={t("risk")} />
      <div className="content">
        <p>
          {t("riskIntro")}{" "}
          <a href="https://github.com/gondola-finance/contracts">
            {t("riskIntro2")}
          </a>{" "}
          {t("riskIntro3")}
        </p>
        <h3>{t("audits")}</h3>
        <p>
          {t("riskAudits")}{" "}
          <a href="https://github.com/gondola-finance/audits">
            {t("riskAudits2")}
          </a>
          {"."}
          <br />
          <br />
          {t("riskAudits3")}
          <br />
          <br />
          {t("riskAudits4")}
        </p>
        <h3>{t("lossOfPeg")}</h3>
        <p>{t("riskLossOfPeg")}</p>
        <Footer />
      </div>
    </div>
  )
}

export default Risk

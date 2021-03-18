import "./MyActivityCard.scss"

import React, { ReactElement } from "react"

import { HistoricalPoolDataType } from "../hooks/useHistoricalPoolData"
import { commify } from "@ethersproject/units"
import { formatBNToString } from "../utils"
import { useTranslation } from "react-i18next"

interface Props {
  historicalPoolData: HistoricalPoolDataType | null
}

function MyActivityCard({ historicalPoolData }: Props): ReactElement | null {
  const { t } = useTranslation()

  if (!historicalPoolData) return null

  const historicalFormattedData = historicalPoolData
    ? {
        totalDepositsUSD: commify(
          formatBNToString(historicalPoolData.totalDepositsUSD, 36, 2),
        ),
        totalWithdrawalsUSD: commify(
          formatBNToString(historicalPoolData.totalWithdrawalsUSD, 36, 2),
        ),
        totalProfitUSD: commify(
          formatBNToString(historicalPoolData.totalProfitUSD, 36, 2),
        ),
      }
    : null

  return (
    <div className="myActivityCard">
      <h4>{t("myActivity")}</h4>
      {historicalFormattedData ? (
        <div className="activityTable">
          <div key="deposits-usd">
            <span className="label">USD {t("deposit")}</span>
            <span>{`$${historicalFormattedData.totalDepositsUSD}`}</span>
          </div>
          <div key="withdrawals-usd">
            <span className="label">USD {t("withdrawal")}</span>
            <span>{`$${historicalFormattedData.totalWithdrawalsUSD}`}</span>
          </div>
          <div key="profit-usd">
            <span className="label">USD {t("profit")}</span>
            <span>{`$${historicalFormattedData.totalProfitUSD}`}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MyActivityCard

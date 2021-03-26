import "../styles/global.scss"

import { BLOCK_TIME, STABLECOIN_POOL_NAME } from "../constants"
import React, { ReactElement, Suspense, useCallback } from "react"
import { Route, Switch } from "react-router-dom"

import { AppDispatch } from "../state"
import Deposit from "./Deposit"
import Risk from "./Risk"
import Stake from "./Stake"
import Swap from "./Swap"
import ToastsProvider from "../providers/ToastsProvider"
import Web3ReactManager from "../components/Web3ReactManager"
import Withdraw from "./Withdraw"
import fetchGasPrices from "../utils/updateGasPrices"
import fetchTokenPricesUSD from "../utils/updateTokenPrices"
import { useDispatch } from "react-redux"
import usePoller from "../hooks/usePoller"

export default function App(): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  const fetchAndUpdateTokensPrice = useCallback(() => {
    fetchTokenPricesUSD(dispatch)
  }, [dispatch])
  const fetchAndUpdateGasPrice = useCallback(() => {
    void fetchGasPrices(dispatch)
  }, [dispatch])
  usePoller(fetchAndUpdateGasPrice, BLOCK_TIME)
  usePoller(fetchAndUpdateTokensPrice, BLOCK_TIME * 3)

  return (
    <Suspense fallback={null}>
      <Web3ReactManager>
        <ToastsProvider>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Swap {...props} poolName={STABLECOIN_POOL_NAME} />
              )}
            />
            <Route
              exact
              path="/deposit"
              render={(props) => (
                <Deposit {...props} poolName={STABLECOIN_POOL_NAME} />
              )}
            />
            <Route
              exact
              path="/withdraw"
              render={(props) => (
                <Withdraw {...props} poolName={STABLECOIN_POOL_NAME} />
              )}
            />
            <Route
              exact
              path="/stake"
              render={(props) => (
                <Stake {...props} poolName={STABLECOIN_POOL_NAME} />
              )}
            />
            <Route exact path="/risk" component={Risk} />
          </Switch>
        </ToastsProvider>
      </Web3ReactManager>
    </Suspense>
  )
}

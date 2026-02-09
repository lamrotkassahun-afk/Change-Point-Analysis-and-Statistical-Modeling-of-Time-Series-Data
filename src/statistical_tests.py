import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import adfuller

def analyze_time_series(df):
    """
    Investigates Brent oil price properties: Trend, Stationarity, and Volatility. [cite: 75, 76, 77]
    """
    # 1. Stationarity Test (ADF) [cite: 76]
    adf_result = adfuller(df['Price'].dropna())
    
    # 2. Calculate Log Returns for Volatility analysis [cite: 93]
    # log(price_t) - log(price_{t-1})
    df['Log_Returns'] = np.log(df['Price']) - np.log(df['Price'].shift(1))
    
    return adf_result, df
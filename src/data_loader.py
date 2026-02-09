import pandas as pd
import os

def load_brent_data(file_path):
    """
    Loads Brent oil price data. 
    Handles variable date formats (e.g., '20-May-87' or 'Apr 22, 2020'). 
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Data file not found at {file_path}")
    
    df = pd.read_csv(file_path)
    
    # Use format='mixed' to handle the date variation found in your CSV
    df['Date'] = pd.to_datetime(df['Date'], format='mixed')
    
    # Ensure data is sorted by date and set as index [cite: 63]
    df = df.sort_values('Date').set_index('Date')
    
    return df
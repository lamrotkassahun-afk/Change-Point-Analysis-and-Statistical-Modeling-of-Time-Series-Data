import pymc as pm
import numpy as np

def build_and_sample_model(data_series):
    # Convert index to a numeric time array for the switch function
    count_data = data_series.values
    n_count_data = len(count_data)
    time_index = np.arange(n_count_data)

    with pm.Model() as model:
        # 1. Define the Switch Point (tau) as a discrete uniform prior
        tau = pm.DiscreteUniform("tau", lower=0, upper=n_count_data - 1)
        
        # 2. Define "Before" and "After" parameters (means)
        mu_1 = pm.Exponential("mu_1", 1.0)
        mu_2 = pm.Exponential("mu_2", 1.0)
        
        # 3. Use pm.math.switch to select the correct parameter
        mu_ = pm.math.switch(tau > time_index, mu_1, mu_2)
        
        # 4. Define the Likelihood (pm.Normal)
        # Using sigma as a prior for volatility
        sigma = pm.Exponential("sigma", 1.0)
        observation = pm.Normal("obs", mu=mu_, sigma=sigma, observed=count_data)
        
        # 5. Run the Sampler
        trace = pm.sample(2000, tune=1000, return_inferencedata=True)
        
    return model, trace
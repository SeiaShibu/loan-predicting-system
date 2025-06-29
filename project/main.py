import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
from xgboost import XGBClassifier
import shap
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

# Suppress warnings for cleaner output
import warnings
warnings.filterwarnings('ignore')

# Load the data
df = pd.read_csv('loans.csv')

# Check for missing values
print("Missing values before handling:")
print(df.isnull().sum())

# Handling missing values # Example: Impute numerical columns with median and categorical with mode
numerical_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']
categorical_cols = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area']

# Impute numerical columns
for col in numerical_cols:
if df[col].isnull().sum() > 0:
median = df[col].median()
df[col].fillna(median, inplace=True)

# Impute categorical columns
for col in categorical_cols:
if df[col].isnull().sum() > 0:
mode = df[col].mode()[0]
df[col].fillna(mode, inplace=True)

print("\nMissing values after handling:")
print(df.isnull().sum())

# Separate features and target
X = df.drop(columns=['Loan_Status', 'Loan_ID'])  # Drop Loan_ID for simplicity
y = df['Loan_Status']

# Define preprocessing for numerical and categorical columns
categorical_cols = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area']
numerical_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']

# Categorical transformer
categorical_transformer = OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore')

# Combine the preprocessing steps
preprocessor = ColumnTransformer(
transformers=[
('num', 'passthrough', numerical_cols),  # Leave numerical columns as they are
('cat', categorical_transformer, categorical_cols)
]
)

# Define the pipeline with a classifier
model = Pipeline(steps=[
('preprocessor', preprocessor),
('classifier', XGBClassifier(eval_metric='logloss', use_label_encoder=False, random_state=42))
])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)

# Fit the model
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print("\nModel Evaluation on Test Set:")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save the model
joblib.dump(model, 'loan_model.pkl')

# Use SHAP to explain the model's predictions # Use TreeExplainer for XGBoost
explainer = shap.TreeExplainer(model['classifier'])

# Get SHAP values for the test set
X_test_transformed = model['preprocessor'].transform(X_test)
shap_values = explainer.shap_values(X_test_transformed)

# Save the explainer
joblib.dump(explainer, 'loan_explainer.pkl')

# SHAP Summary Plot
plt.figure(figsize=(10, 7))
shap.summary_plot(shap_values, X_test_transformed, feature_names=model['preprocessor'].get_feature_names_out())
plt.tight_layout()
plt.close()

def explain_loan_application(instance_data):
"""
Explains the loan approval prediction for a single instance using SHAP.
"""
# Transform the input instance using the preprocessor
transformed_instance = model['preprocessor'].transform(instance_data)


# Use SHAP to explain the instance'

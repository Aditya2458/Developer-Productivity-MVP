from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/metrics")
def get_metrics():
    return {
        "lead_time": 6,
        "cycle_time": 5,
        "bug_rate": 0.3,
        "deployment_frequency": 2,
        "pr_throughput": 12
    }
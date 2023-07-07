import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function ViewBook() {
    const [searchparams] = useSearchParams();
    const photo = searchparams.get("photo");
    return (
        <div>
            <Grid container sx={{ padding: "30px" }}>
                <Grid item xs={4} sx={{ padding: "10px" }}>
                    <img src={localStorage.getItem(photo)} alt="viewBook"
                        style={{ width: "380px", height: "410px" }} />
                </Grid>
                <Grid item xs={8}>
                    <h1>{searchparams.get("name")}</h1>
                    {searchparams.get("discount").length === 0
                        ? <span>{searchparams.get("price")}$ </span>
                        : <div style={{ width: "70px", height: "20px", backgroundColor: "#FFCCCB", textDecoration: "line-through", textDecorationColor: "red", textAlign: "center" }}>
                            <span>{searchparams.get("price")}$ </span>
                            <span style={{ color: "red" }}>{searchparams.get("discount")}$</span>
                        </div>}
                    <div style={{ width: "500px" }}>
                        <h3>Description</h3>
                        {searchparams.get("description")}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
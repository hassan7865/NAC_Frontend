import { CircularProgress } from '@mui/material'
export default function Loader() {
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"90vh"}}>
            <CircularProgress size="50px" />
        </div>
    )
}
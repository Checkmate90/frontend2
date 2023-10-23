import { Button, Container, MenuItem, Modal, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";


export default function TodoComponent(){

    const [abierto, setAbierto] = useState(false);
    const handleAbierto = () => {setAbierto(true)};
    const handleCierre = () => setAbierto(false);
    
    const [abierto2, setAbierto2] = useState(false);
    const handleAbierto2 = () => {setAbierto2(true)};
    const handleCierre2 = () => setAbierto2(false);



    const[dispositivos,setDispositivos]= useState([]);

    const getDispositivos = async () =>{
        const response = await fetch(`http://127.0.0.1:8000/api/todo?marca=${marca}&modelo=${modelo}&bodega=${bodega}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        const data = await response.json();
        setDispositivos(data);
        //console.log("dispositivos");
        //console.log(data);
        //console.log(data[0])
    };

    useEffect(()=>{
        getDispositivos();
        getMarcas();
        getModelos();
        getBodegas();
    },[]);

    const [bodega, setBodega] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');

    const [bodegas, setBodegas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [marcas, setMarcas] = useState([]);

    const getMarcas = async () =>{
        const response = await fetch(`http://127.0.0.1:8000/api/marcas`);
        const data = await response.json();
        setMarcas(data);
        //console.log("marcas");
        //console.log(data);
    };
    const getModelos = async () =>{
        const response = await fetch(`http://127.0.0.1:8000/api/modelos`);
        const data = await response.json();
        setModelos(data);
        //console.log("modelos");
        //console.log(data);
    };
    const getBodegas = async () =>{
        const response = await fetch(`http://127.0.0.1:8000/api/bodegas`);
        const data = await response.json();
        setBodegas(data);
        //console.log("bodegas");
        //console.log(data);
    };

    const vaciarBoombox = () =>{
        setBodega('');
        setModelo('');
        setMarca('');
        getDispositivos();
    };

    const filtrar = () =>{
        getDispositivos();
    }


    return (
        <Container component="main">
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Filtros
                                </TableCell>
                                <TableCell>
                                    <Select
                                        labelId="Bodegas-disponibles"
                                        id="Simple-bodega"
                                        label="Bodegas"
                                        value={bodega}
                                        defaultValue=""
                                        onChange={(event)=>{
                                            setBodega(event.target.value);
                                        }}
                                    >
                                        {bodegas.map((bod)=>{
                                            return <MenuItem value={bod.id}>{bod.nombreBodega}</MenuItem>
                                        })}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        labelId="Marcas-disponibles"
                                        id="Simple-marcas"
                                        label="Marcas"
                                        value={marca}
                                        onChange={(event)=>{
                                            setMarca(event.target.value);
                                        }}
                                    >
                                        {marcas.map((mar)=>{
                                            return <MenuItem value={mar.id}>{mar.nombre}</MenuItem>
                                        })}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        labelId="Modelos-disponibles"
                                        id="Simple-modelos"
                                        label="Modelos"
                                        value={modelo}
                                        onChange={(event)=>{
                                            setModelo(event.target.value);
                                        }}
                                    >
                                        {modelos.map((mod)=>{
                                            return <MenuItem value={mod.id}>{mod.nombreModelos}</MenuItem>
                                        })}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" style={{backgroundColor: "#800080"}} onClick={()=>{filtrar()}}>
                                        Filtrar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="info"
                                        onClick={()=>{vaciarBoombox()}}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained" style={{backgroundColor: "#69a420"}}
                                    >
                                        Crear Nuevo
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    id
                                </TableCell>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Marca
                                </TableCell>
                                <TableCell>
                                    Modelo
                                </TableCell>
                                <TableCell>
                                    Bodega
                                </TableCell>
                                <TableCell>
                                    Editar
                                </TableCell>
                                <TableCell>
                                    Eliminar
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dispositivos.map((row)=>(
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                > {/* {console.log("assdfghj")}{console.log(row)} */}
                                    <TableCell component="th" scope="row">{row.id}</TableCell> 
                                    <TableCell align='left'>{row.nombreDispositivos}</TableCell>
                                    <TableCell align='left'>{row.marcas_nombre}</TableCell>
                                    <TableCell align='left'>{row.mod_nombre}</TableCell>
                                    <TableCell align='left'>{row.bod_nombre}</TableCell>
                                    <TableCell><Button variant="outlined" color="info">Editar</Button></TableCell>
                                    <TableCell><Button variant="outlined" color="error">Eliminar</Button></TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
}
import { Button, Container, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";


export default function TodoComponent(){


    const[modelos,setModelos]= useState([]);

    const getModelos = async () =>{
        const response = await fetch(`http://127.0.0.1:8000/api/todo`);
        const data = await response.json();
        setModelos(data);
        console.log(data);
        console.log(data[0]);
    };

    useEffect(()=>{
        getModelos();
    },[]);


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
                                    >

                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        labelId="Marcas-disponibles"
                                        id="Simple-marcas"
                                        label="Marcas"
                                    >

                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        labelId="Modelos-disponibles"
                                        id="Simple-modelos"
                                        label="Modelos"
                                    >

                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained">
                                        Filtrar
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {modelos.map((row)=>(
                                <TableRow
                                    key={row[0].id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                >
                                    <TableCell component="th" scope="row">
                                        {row[0].id}
                                    </TableCell>
                                    <TableCell align='right'>{row[1].nombreDispositivos}</TableCell>
                                    <TableCell align='right'>{row[7].marcas_nombre}</TableCell>
                                    <TableCell align='right'>{row[6].mod_nombre}</TableCell>
                                    <TableCell align='right'>{row[5].bod_nombre}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
}
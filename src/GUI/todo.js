import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Modal, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";


export default function TodoComponent(){

    const [abierto, setAbierto] = useState(false);
    const handleAbierto = () => {setAbierto(true)};
    const handleCierre = () => {setAbierto(false); setBodega2(''); setMarca2('');setModelo2(''); setNombre2('')};
    
    const [abierto2, setAbierto2] = useState(false);
    const handleAbierto2 = () => {setAbierto2(true)};
    const handleCierre2 = () => {setAbierto2(false); setBodega2(''); setMarca2('');setModelo2(''); setNombre2('')};



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

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [mensaje, setMensaje] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
    };



    const [idActual, setIdActual] = useState('');

    const [bodega, setBodega] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');

    const [bodega2, setBodega2] = useState('');
    const [modelo2, setModelo2] = useState('');
    const [marca2, setMarca2] = useState('');
    const [nombre2,setNombre2]=useState('');

    const [bodegas, setBodegas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [modelos2, setModelos2] = useState([]);
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

    const getModelos2 = async (mar) =>{
        const response = await fetch(`http://127.0.0.1:8000/api/modelos?marca${mar}`);
        const data = await response.json();
        setModelos2(data);
        //console.log("modelos");
        //console.log(data);
    };

    const crearDispositivo =() =>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ marca:marca2, modelo:modelo2, bodega:bodega2, nombre:nombre2})
          };
          fetch("http://127.0.0.1:8000/api/crear", requestOptions)
            .then((response) => { 
                if(response.status===200){
                    setOpen(true)
                    setSeverity('success');
                    setMensaje('Dispositivo Creado Correctamente');
                    handleCierre2()
                    //console.log("Exito")
                }else{
                    //console.log("fallo")
                    setOpen(true)
                    setSeverity('error');
                    setMensaje('Dispositivo No Creado');
                    handleCierre2()
                }
                    
                    
                });
        getDispositivos();
        handleCierre2();
    }

    const modificarDispositivo =() =>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ marca:marca2, modelo:modelo2, bodega:bodega2, nombre:nombre2, idDispositivo:idActual})
          };
          fetch("http://127.0.0.1:8000/api/editar", requestOptions)
            .then((response) => { 
                if(response.status===200){
                    setOpen(true)
                    setSeverity('success');
                    setMensaje('Dispositivo Modificado Correctamente');
                    handleCierre2()
                    //console.log("Exito")
                }else{
                    //console.log("fallo")
                    setOpen(true)
                    setSeverity('error');
                    setMensaje('Dispositivo No Modificado');
                    handleCierre2()
                }
                    
                    
                });
        getDispositivos();
        handleCierre2();
    }

    const [notificacion, setNotificacion] = useState(false);

       const handleBorrarDef = () =>{
        eliminarDispositivo();
       setNotificacion(false);
   }
   
   const handleCerrarNotif = () => {
       setNotificacion(false);
   }
    const eliminarDispositivo =() =>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ marca:marca2, modelo:modelo2, bodega:bodega2, nombre:nombre2, idDispositivo:idActual})
          };
          fetch("http://127.0.0.1:8000/api/eliminar", requestOptions)
            .then((response) => { 
                if(response.status===200){
                    setOpen(true)
                    setSeverity('success');
                    setMensaje('Dispositivo Eliminado Correctamente');
                    //console.log("Exito")
                }else{
                    //console.log("fallo")
                    setOpen(true)
                    setSeverity('error');
                    setMensaje('Dispositivo No Eliminado');
                }
                    
                    
                });
        getDispositivos();
        handleCierre2();
    }

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
        <>
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
                                    <InputLabel>Bodegas</InputLabel>
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
                                    <InputLabel>Marcas</InputLabel>
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
                                    <InputLabel>Modelos</InputLabel>
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
                                        onClick={handleAbierto2}
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
                                    <TableCell><Button variant="outlined" color="info" onClick={()=>{handleAbierto(); setIdActual(row.id); setBodega2(row.bod_id); setMarca2(row.marcasDispositivos); setModelo2(row.modeloDispositivos);setNombre2(row.nombreDispositivos)}}>Editar</Button></TableCell>
                                    <TableCell><Button variant="outlined" color="error" onClick={() => {setNotificacion(true); setIdActual(row.id);setBodega2(row.bod_id);}}>Eliminar</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={abierto}
                    onClose={handleCierre}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        component="form"
                        autoComplete="off"
                        style={{
                            background:"#FFFFFF",
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Editar Dispositivos
                        </Typography>
                        <FormControl>
                            <div>
                                <InputLabel>Bodegas</InputLabel>
                                <Select
                                    labelId="Bodegas-disponibles"
                                    id="Simple-bodega"
                                    label="Bodegas"
                                    value={bodega2}
                                    defaultValue=""
                                    onChange={(event)=>{
                                        setBodega2(event.target.value);
                                    }}
                                >
                                    {bodegas.map((bod)=>{
                                        return <MenuItem value={bod.id}>{bod.nombreBodega}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div>
                                <InputLabel>Marcas</InputLabel>
                                <Select
                                    labelId="Marcas-disponibles"
                                    id="Simple-marcas"
                                    label="Marcas"
                                    value={marca2}
                                    onChange={(event)=>{
                                        setMarca2(event.target.value);
                                        getModelos2(event.target.value);
                                    }}
                                >
                                    {marcas.map((mar)=>{
                                        return <MenuItem value={mar.id}>{mar.nombre}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div>
                                <InputLabel>Modelos</InputLabel>
                                <Select
                                    labelId="Modelos-disponibles"
                                    id="Simple-modelos"
                                    label="Modelos"
                                    value={modelo2}
                                    onChange={(event)=>{
                                        setModelo2(event.target.value);
                                    }}
                                >
                                    {modelos2.map((mod)=>{
                                        return <MenuItem value={mod.id}>{mod.nombreModelos}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div>
                                <TextField
                                    required
                                    id="simple-nombre-calle"
                                    label="Nombre del Dispositivo"
                                    value={nombre2}
                                    onChange={(event)=>{setNombre2(event.target.value)}}
                                />
                            </div>
                        </FormControl>
                        <Button onClick={()=>{modificarDispositivo(); handleCierre2()}} variant="contained">Modificar</Button>
                    </Box>
                </Modal>
                <Modal
                    open={abierto2}
                    onClose={handleCierre2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        component="form"
                        autoComplete="off"
                        style={{
                            background:"#FFFFFF",
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Creación de Nuevos Dispositivos
                        </Typography>
                        <FormControl>
                            <div>
                                <InputLabel>Bodegas</InputLabel>
                                <Select
                                    labelId="Bodegas-disponibles"
                                    id="Simple-bodega"
                                    label="Bodegas"
                                    value={bodega2}
                                    defaultValue=""
                                    onChange={(event)=>{
                                        setBodega2(event.target.value);
                                    }}
                                >
                                    {bodegas.map((bod)=>{
                                        return <MenuItem value={bod.id}>{bod.nombreBodega}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div>
                                <InputLabel>Marcas</InputLabel>
                                <Select
                                    labelId="Marcas-disponibles"
                                    id="Simple-marcas"
                                    label="Marcas"
                                    value={marca2}
                                    onChange={(event)=>{
                                        setMarca2(event.target.value);
                                        getModelos2(event.target.value);
                                    }}
                                >
                                    {marcas.map((mar)=>{
                                        return <MenuItem value={mar.id}>{mar.nombre}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div>
                                <InputLabel>Modelos</InputLabel>
                                <Select
                                    labelId="Modelos-disponibles"
                                    id="Simple-modelos"
                                    label="Modelos"
                                    value={modelo2}
                                    onChange={(event)=>{
                                        setModelo2(event.target.value);
                                    }}
                                >
                                    {modelos2.map((mod)=>{
                                        return <MenuItem value={mod.id}>{mod.nombreModelos}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl>
                            <div>
                                <TextField
                                    required
                                    id="simple-nombre-calle"
                                    label="Nombre del Dispositivo"
                                    value={nombre2}
                                    onChange={(event)=>{setNombre2(event.target.value)}}
                                />
                            </div>
                        </FormControl>
                        <Button onClick={()=>{crearDispositivo(); handleCierre2()}} variant="contained">Crear</Button>
                    </Box>
                </Modal>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert onClose={handleClose} severity={severity}>{mensaje}</Alert></Snackbar>
                <Dialog open={notificacion} >
                    <DialogTitle id="alert-dialog-title">
                        {"¿Realmente Deseas Borrar?"}
                    </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                El Borrado es Definitivo y no puede deshacerse.
                                ¿Realmente deseas Borrar?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCerrarNotif}>Cancelar</Button>
                            <Button onClick={handleBorrarDef} autoFocus>
                                Borrar
                            </Button>
                        </DialogActions>
                </Dialog>
            </div>
        </Container>
        </>
    );
}
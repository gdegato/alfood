import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom'
import http from '../../../http'

const AdministracaoRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])


  const excluir = (restauranteParaSerExcluido: IRestaurante) => {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteParaSerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteParaSerExcluido.id)
        setRestaurantes([...listaRestaurante])
      })
  }

  return (

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
            <TableCell>
              {restaurante.nome}
            </TableCell>
            <TableCell>
              [<RouterLink to={`/admin/restaurantes/${restaurante.id}`}>Editar</RouterLink>]
            </TableCell>
            <TableCell>
              <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>Excluir</Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes

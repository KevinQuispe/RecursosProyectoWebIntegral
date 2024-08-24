package com.example.microservicioPeliculas.service;

import com.example.microservicioPeliculas.entity.Compra;
import com.example.microservicioPeliculas.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CompraService {
    @Autowired
    private CompraRepository compraRepository;

    //Metodo para obtener todas las compras
    public List<Compra> getAllCompras() {
        return compraRepository.findAll();
    }


    public List<Compra> getComprasByUserId(Long userId) {
        return (List<Compra>) compraRepository.findByUsuarioId(userId);
    }

    public boolean deleteCompraById(long id) {
        if (compraRepository.existsById(id)) {
            compraRepository.deleteById(id);
            return true;
        }
        return false;
    }


    //Metodo para crear una compra
    public Compra createCompra(Compra compra) {
        return compraRepository.save(compra);
    }


    //Metodo para eliminar una compra
    public String deleteCompra(Long id){
        Optional<Compra> existingProduct = compraRepository.findById(id);
        if(existingProduct.isPresent()){
            compraRepository.deleteById(id);
            return "La compra fue eliminada correctamente";
        }
        return "No se encontraron datos de compra";
    }

    //Metodo para obtener una compra por id
    public Compra updateCompra(Long id, Compra compra){
        Optional<Compra> comprasData = compraRepository.findById(id);
        Compra updateCompraData = comprasData.get();
        updateCompraData.setNombre(updateCompraData.getNombre());
        updateCompraData.setNumTarjeta(updateCompraData.getNumTarjeta());
        updateCompraData.setCvv(updateCompraData.getCvv());
        updateCompraData.setFechaVencimiento(updateCompraData.getFechaVencimiento());
        updateCompraData.setTotal(updateCompraData.getTotal());
        updateCompraData.setTotal(updateCompraData.getTotal());
        Compra CompraObject = compraRepository.save(updateCompraData);
        return CompraObject;
    }

    //Metodo para obtener una compra por id
    public Optional<Compra> getCompraById(Long id) {
        return compraRepository.findById(id);
    }
}

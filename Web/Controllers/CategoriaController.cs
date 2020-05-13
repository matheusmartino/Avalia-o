using Domain.Entities;
using Infra.Data;
using Infra.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Web.ViewModel;

namespace Web.Controllers
{
    [Route("api/v1/categorias")]
    public class CategoriaController : Controller
    {
        private readonly CategoriaRepository _categoriaRep;


        public CategoriaController(CategoriaRepository categoriaRep)
        {
            _categoriaRep = categoriaRep;
        }

        public IActionResult Index() => View();

        /// <summary>
        /// Api de Retorno de todas as categorias cadastradas no sistema
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("all")]
        public List<Categoria> ObterTodasCategorias() => _categoriaRep.GetAll();


        [HttpGet]
        [Route("paginacao/{pageNo}")]
        public CategoriaViewModel TotalPaginas(int pageNo)
        {

            int totalPag, totalRegistro, pageSize;
            pageSize = 5;

            totalRegistro = _categoriaRep.GetAll().Count();
            totalPag = (totalRegistro / pageSize) + ((totalRegistro % pageSize) > 0 ? 1 : 0);
            var registro = (from a in _categoriaRep.GetAll()
                          orderby a.CategoriaNome
                          select a).Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
            CategoriaViewModel categoria = new CategoriaViewModel
            {
                categoria = registro,
                paginas = totalPag
            };
            return categoria;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="categoria"></param>
        [HttpPost]
        [Route("salvar")]
        public ActionResult Salvar([FromBody]Categoria categoria)
        {
            if (categoria.CategoriaId > 0)
                _categoriaRep.Update(categoria);
            else
                _categoriaRep.Add(categoria);

            return StatusCode(200);
            
        }

        /// <summary>
        /// Api de Exclusão de Categorias, excluindo em cascata os produtos associados a categoria
        /// </summary>
        /// <param name="id">ID da Categoria a ser Excluida</param>
        [HttpDelete]
        [Route("excluir/{id}")]
        public void Excluir(int id) => _categoriaRep.Delete(id);


        /// <summary>
        /// Api para obtenção da categoria baseado em seu ID
        /// </summary>
        /// <param name="id">ID da Categoria a ser Pesquisada</param>
        [HttpGet]
        [Route("obterporID/{id}")]
        public Categoria ObterPorId(int id) => _categoriaRep.Get(id);

    }
}

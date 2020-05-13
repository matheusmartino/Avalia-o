using Domain.Entities;
using Infra.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.ViewModel;

namespace Web.Controllers
{
    [Route("api/v1/produtos")]
    public class ProdutoController : Controller
    {
        private readonly ProdutoRepository _produtoRep;


        public ProdutoController(ProdutoRepository produtoRep)
        {
            _produtoRep = produtoRep;
        }

        public IActionResult Index() => View();

        /// <summary>
        /// Api de Retorno de todas as produtos cadastradas no sistema
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("all")]
        public List<Produto> ObterTodasProdutos() => _produtoRep.GetAll();


        [HttpGet]
        [Route("paginacao/{pageNo}")]
        public ProdutoViewModel TotalPaginas(int pageNo)
        {

            int totalPag, totalRegistro, pageSize;
            pageSize = 5;

            totalRegistro = _produtoRep.GetAll().Count();
            totalPag = (totalRegistro / pageSize) + ((totalRegistro % pageSize) > 0 ? 1 : 0);
            var registro = (from a in _produtoRep.GetAll()                            
                            orderby a.ProdutoNome
                            select a).Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
            ProdutoViewModel produto = new ProdutoViewModel
            {
                produto = registro,
                paginas = totalPag
            };
            return produto;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="produto"></param>
        [HttpPost]
        [Route("salvar")]
        public ActionResult Salvar([FromBody]Produto produto)
        {          
            if (produto.ProdutoId > 0)
                _produtoRep.Update(produto);
            else
                _produtoRep.Add(produto);

            return StatusCode(200);

        }

        /// <summary>
        /// Api de Exclusão de Produtos, excluindo em cascata os produtos associados a produto
        /// </summary>
        /// <param name="id">ID da Produto a ser Excluida</param>
        [HttpDelete]
        [Route("excluir/{id}")]
        public void Excluir(int id) => _produtoRep.Delete(id);


        /// <summary>
        /// Api para obtenção da produto baseado em seu ID
        /// </summary>
        /// <param name="id">ID da Produto a ser Pesquisada</param>
        [HttpGet]
        [Route("obterporID/{id}")]
        public Produto ObterPorId(int id) => _produtoRep.Get(id);
    }
}

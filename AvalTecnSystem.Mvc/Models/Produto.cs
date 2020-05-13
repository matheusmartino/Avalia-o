using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvalTecnSystem.Mvc.Models
{
    public class Produto
    {

        public int ProdutoId { get; set; }

        public string ProdutoNome { get; set; }

        public decimal ProdutoValor { get; set; }

        public Categoria Categoria{ get; set; }
    }
}

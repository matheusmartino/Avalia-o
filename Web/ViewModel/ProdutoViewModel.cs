using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.ViewModel
{
    public class ProdutoViewModel
    {
        public List<Produto> produto { get; set; }

        public int paginas { get; set; }
    }  
}

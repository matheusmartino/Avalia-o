using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infra.Data
{
    public interface IProdutoRepository : ICategoriaRepository<Produto>
    {       
    }
}

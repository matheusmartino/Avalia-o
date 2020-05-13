using Domain.Entities;
using Infra.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infra.Repository
{
    public class ProdutoRepository : IProdutoRepository
    {
        DataContext _dataContext;

        public ProdutoRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Produto Add(Produto entity)
        {
            _dataContext.Add(entity);
            _dataContext.SaveChanges();
            return entity;
        }

        public void Delete(int id)
        {
            var entity = _dataContext.Produto.Find(id);

            _dataContext.Remove(entity);
            _dataContext.SaveChanges();
        }

        public Produto Get(int id)
        {
            return _dataContext.Produto.Where(b=>b.ProdutoId == id)
                    .Include(a => a.Categoria).FirstOrDefault();
                
        }

        public List<Produto> GetAll()
        {
            return _dataContext.Produto
                .Include(a=>a.Categoria)
                .ToList();
        }

        public void Update(Produto entity)
        {
            _dataContext.Entry(entity).State = EntityState.Modified;
            _dataContext.SaveChanges();            
        }
    }
}

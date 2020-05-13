using Domain.Entities;
using Infra.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infra.Repository
{
    public class CategoriaRepository : ICategoriaRepository<Categoria>
    {
        DataContext _dataContext;

        public CategoriaRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Categoria Add(Categoria entity)
        {
            _dataContext.Add(entity);
            _dataContext.SaveChanges();
            return entity;
        }

        public void Delete(int id)
        {
            var entity = _dataContext.Categoria.Find(id);

            _dataContext.Remove(entity);
            _dataContext.SaveChanges();
        }

        public Categoria Get(int id)
        {
            return _dataContext.Categoria.Find(id);
        }

        public List<Categoria> GetAll()
        {
            return _dataContext.Categoria.ToList();
        }

        public void Update(Categoria entity)
        {
            _dataContext.Entry(entity).State = EntityState.Modified;
            _dataContext.SaveChanges();
        }
    }
}

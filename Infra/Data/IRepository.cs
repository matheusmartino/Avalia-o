using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Data
{
    public interface ICategoriaRepository<T> where T : class
    {
        List<T> GetAll();
        T Get(int id);
        T Add(T entity);
        void Update(T entity);
        void Delete(int id);
    }
}

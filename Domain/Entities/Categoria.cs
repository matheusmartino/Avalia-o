using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text;

namespace Domain.Entities
{
    public class Categoria
    {
        
        public int CategoriaId { get; set; }
        
        [Required]
        //[MaxLength(3, "Categoria não pode estar em branco ou menor que 3 caracteres")]
        public string CategoriaNome { get; set; }        

    }
}

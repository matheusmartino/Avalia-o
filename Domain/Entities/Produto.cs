using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class Produto
    {
        

        [Required]
        public int ProdutoId { get; set; }
        [Required]
        public int CategoriaId { get; set; }
        [Required]
        public string ProdutoNome { get; set; }
        [Required]
        [Column(TypeName = "decimal(5, 2)")]
        public decimal ProdutoValor { get; set; }
        public virtual Categoria Categoria { get; set; }
    }
}

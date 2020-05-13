using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infra.Config
{
    public class ProdutoConfig : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {


            builder.ToTable("Produto");

            builder.HasKey(x => x.ProdutoId); 
            
            

            builder.Property(t => t.ProdutoNome).HasMaxLength(50);

            builder.Property(t => t.ProdutoValor);

       


        }
    }
}

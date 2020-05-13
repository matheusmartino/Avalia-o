using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infra.Config
{
    public class CategoriaConfig : IEntityTypeConfiguration<Categoria>
    {
        public void Configure(EntityTypeBuilder<Categoria> builder)
        {


            builder.ToTable("Categoria");

            builder.HasKey(x => x.CategoriaId);

            builder.Property(t => t.CategoriaNome).HasMaxLength(50);

            
                
        }
    }
}

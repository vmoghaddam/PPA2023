//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EPAGriffinAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class BookChapter
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BookChapter()
        {
            this.BookChapter1 = new HashSet<BookChapter>();
        }
    
        public int Id { get; set; }
        public string Title { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string Remark { get; set; }
        public string Code { get; set; }
        public string FullCode { get; set; }
        public Nullable<int> BookId { get; set; }
        public string BookKey { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BookChapter> BookChapter1 { get; set; }
        public virtual BookChapter BookChapter2 { get; set; }
        public virtual Book Book { get; set; }
    }
}

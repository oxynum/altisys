using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Altisys.Core.ProjetV2.Models
{

    public class ActionHisto
    {
        public string Societe { get; set; }
        public string Numcomptable { get; set; }
        public DateTime Dateaction { get; set; }
        public DateTime Heureaction { get; set; }
        public string Agentrecouvrement { get; set; }
        public string Codeetat { get; set; }
        public string Agentencaisseur { get; set; }
        public string Notes { get; set; }
        public string Block { get; set; }
        public string Bsecretaire { get; set; }
        public string Bcontact { get; set; }
        public string Bechec { get; set; }
        public string Blettre { get; set; }
        public object Brvencaisseur { get; set; }
        public string Codeaction { get; set; }
        public object Scenario { get; set; }
        public object Niv_relance { get; set; }
        public string Idcampagne { get; set; }
        public string Npiece { get; set; }
        public object Montant { get; set; }
        public object Mtsolde { get; set; }
        public string Code_groupe { get; set; }
        public object Idecheancier { get; set; }
        public object Filearchive { get; set; }
        public object FileAR { get; set; }
        public object Chemin_gen { get; set; }
        public object Chemin_arch { get; set; }
        public object Type_rel { get; set; }
        public object Namefile { get; set; }
        public object Id_mailhis { get; set; }
        public object Mail_objects { get; set; }
        public object Mail_corps { get; set; }
        public object Sfrom { get; set; }
        public object Sto { get; set; }
        public object Scc { get; set; }
        public object Scci { get; set; }
        public bool BsecretaireToBool { get; set; }
        public bool BcontactToBool { get; set; }
        public bool BechecToBool { get; set; }
        public bool BlettreToBool { get; set; }
    }

}
import { domainmodels } from "mendixmodelsdk";
import IAssociation = domainmodels.IAssociation;
import AssociationType = domainmodels.AssociationType;
import AssociationOwner = domainmodels.AssociationOwner;

export const multiplicity = (association: IAssociation): string => {
	const type = association.type;
	const owner = association.owner;

	if (type === AssociationType.Reference && owner === AssociationOwner.Both) {
		return "One-to-one";
	} else if (type === AssociationType.Reference && owner === AssociationOwner.Default) {
		return "One-to-many";
	} else if (type === AssociationType.ReferenceSet && owner === AssociationOwner.Default) {
		return "Many-to-many";
	} else if (type === AssociationType.ReferenceSet && owner === AssociationOwner.Both) {
		return "Many-to-many";
	} else {
		return "";
	}
};

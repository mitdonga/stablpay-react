import { Badge } from "@chakra-ui/react";

export function companyStatusBadge(status, fSize='1.5em') {
	switch (status) {
		case "pending":
			return (<Badge my='2' fontSize={fSize} colorScheme='yellow'>
				Pending
			</Badge>)
		case "approved":
			return (<Badge my='2' fontSize={fSize} colorScheme='green'>
				Approved
			</Badge>)
		case "rejected":
			return (<Badge my='2' fontSize={fSize} colorScheme='red'>
				Rejected
			</Badge>)
		default:
			return null;
	}
}
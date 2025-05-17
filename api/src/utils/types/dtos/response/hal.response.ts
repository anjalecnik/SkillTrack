import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IHalLink, IHalLinks } from "../../interfaces"
import { PaginatedMetaResponse } from "./paginated-meta.response"

export class HalLinkResponse implements IHalLink {
	@ApiProperty({ example: "/api/resource" })
	href!: string

	@ApiPropertyOptional({ type: Boolean, example: false })
	templated?: boolean

	@ApiPropertyOptional({ example: "type" })
	type?: string

	@ApiPropertyOptional({ example: "deprecation" })
	deprecation?: string

	@ApiPropertyOptional({ example: "name" })
	name?: string

	@ApiPropertyOptional({ example: "profile" })
	profile?: string

	@ApiPropertyOptional({ example: "title" })
	title?: string

	@ApiPropertyOptional({ example: "hreflang" })
	hreflang?: string
}

export class HalLinksPaginationResponse implements IHalLinks {
	[key: string]: HalLinkResponse | HalLinkResponse[] | undefined

	@ApiProperty({ type: HalLinkResponse })
	self!: HalLinkResponse

	@ApiProperty({ type: HalLinkResponse })
	first!: HalLinkResponse

	@ApiProperty({ type: HalLinkResponse })
	last!: HalLinkResponse

	@ApiPropertyOptional({ type: HalLinkResponse })
	next?: HalLinkResponse

	@ApiPropertyOptional({ type: HalLinkResponse })
	previous?: HalLinkResponse

	@ApiPropertyOptional({ type: HalLinkResponse })
	find?: HalLinkResponse
}

export class HalLinksResponse implements IHalLinks {
	[key: string]: HalLinkResponse | HalLinkResponse[] | undefined

	@ApiProperty({ type: HalLinkResponse })
	self!: HalLinkResponse
}

// Hal as described standard
export class HalResourceStandardResponse {
	@ApiPropertyOptional({ type: HalLinksResponse })
	_links?: HalLinksResponse | HalLinksPaginationResponse

	@ApiPropertyOptional({
		type: HalResourceStandardResponse
	})
	_embedded?: {
		[rel: string]: HalResourceStandardResponse | HalResourceStandardResponse[]
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any // Additional properties specific to the resource
}

// Hal pagination
export class HalResourcePaginationResponse extends PaginatedMetaResponse {
	@ApiProperty({ type: HalLinksPaginationResponse })
	_links!: HalLinksPaginationResponse

	@ApiPropertyOptional({
		type: HalResourceStandardResponse
	})
	_embedded?: {
		[rel: string]: HalResourceStandardResponse | HalResourceStandardResponse[]
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any // Additional properties specific to the resource
}

// Hal with required links
export class HalResourceResponse extends HalResourceStandardResponse {
	@ApiProperty({ type: HalLinksResponse })
	declare _links: HalLinksResponse | HalLinksPaginationResponse
}

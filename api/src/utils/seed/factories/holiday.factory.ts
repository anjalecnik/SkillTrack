import { setSeederFactory } from "typeorm-extension"
import { HolidayEntity } from "../../../libs/db/entities/holiday.entity"

export const predefinedHolidays: Partial<HolidayEntity>[] = [
	{
		name: "Novo leto",
		date: new Date("2025-01-01"),
		countryCode: "SI"
	},
	{
		name: "Novo leto",
		date: new Date("2025-01-02"),
		countryCode: "SI"
	},
	{
		name: "Prešernov dan, slovenski kulturni praznik",
		date: new Date("2025-02-08"),
		countryCode: "SI"
	},
	{
		name: "Velika noč",
		date: new Date("2025-04-20"),
		countryCode: "SI"
	},
	{
		name: "Velikonočni ponedeljek",
		date: new Date("2025-04-21"),
		countryCode: "SI"
	},
	{
		name: "Dan upora proti okupatorju",
		date: new Date("2025-04-27"),
		countryCode: "SI"
	},
	{
		name: "Praznik dela",
		date: new Date("2025-05-01"),
		countryCode: "SI"
	},
	{
		name: "Praznik dela",
		date: new Date("2025-05-02"),
		countryCode: "SI"
	},
	{
		name: "Binkošti",
		date: new Date("2025-06-08"),
		countryCode: "SI"
	},
	{
		name: "Dan državnosti",
		date: new Date("2025-06-25"),
		countryCode: "SI"
	},
	{
		name: "Marijino vnebovzetje",
		date: new Date("2025-08-15"),
		countryCode: "SI"
	},
	{
		name: "Dan reformacije",
		date: new Date("2025-10-31"),
		countryCode: "SI"
	},
	{
		name: "Dan spomina na mrtve",
		date: new Date("2025-11-01"),
		countryCode: "SI"
	},
	{
		name: "Božič",
		date: new Date("2025-12-25"),
		countryCode: "SI"
	},
	{
		name: "Dan samostojnosti in enotnosti",
		date: new Date("2025-12-26"),
		countryCode: "SI"
	},
	{
		name: "Novo leto",
		date: new Date("2026-01-01"),
		countryCode: "SI"
	},
	{
		name: "Novo leto",
		date: new Date("2026-01-02"),
		countryCode: "SI"
	},
	{
		name: "Prešernov dan, slovenski kulturni praznik",
		date: new Date("2026-02-08"),
		countryCode: "SI"
	},
	{
		name: "Velika noč",
		date: new Date("2026-04-05"),
		countryCode: "SI"
	},
	{
		name: "Velikonočni ponedeljek",
		date: new Date("2026-04-06"),
		countryCode: "SI"
	},
	{
		name: "Dan upora proti okupatorju",
		date: new Date("2026-04-27"),
		countryCode: "SI"
	},
	{
		name: "Praznik dela",
		date: new Date("2026-05-01"),
		countryCode: "SI"
	},
	{
		name: "Praznik dela",
		date: new Date("2026-05-02"),
		countryCode: "SI"
	},
	{
		name: "Binkošti",
		date: new Date("2026-05-24"),
		countryCode: "SI"
	},
	{
		name: "Dan državnosti",
		date: new Date("2026-06-25"),
		countryCode: "SI"
	},
	{
		name: "Marijino vnebovzetje",
		date: new Date("2026-08-15"),
		countryCode: "SI"
	},
	{
		name: "Dan reformacije",
		date: new Date("2026-10-31"),
		countryCode: "SI"
	},
	{
		name: "Dan spomina na mrtve",
		date: new Date("2026-11-01"),
		countryCode: "SI"
	},
	{
		name: "Božič",
		date: new Date("2026-12-25"),
		countryCode: "SI"
	},
	{
		name: "Dan samostojnosti in enotnosti",
		date: new Date("2026-12-26"),
		countryCode: "SI"
	},
	{
		name: "Novo leto",
		date: new Date("2027-01-01"),
		countryCode: "SI"
	},
	{
		name: "Novo leto",
		date: new Date("2027-01-02"),
		countryCode: "SI"
	},
	{
		name: "Prešernov dan, slovenski kulturni praznik",
		date: new Date("2027-02-08"),
		countryCode: "SI"
	},
	{
		name: "Velika noč",
		date: new Date("2027-03-28"),
		countryCode: "SI"
	},
	{
		name: "Velikonočni ponedeljek",
		date: new Date("2027-03-29"),
		countryCode: "SI"
	},
	{
		name: "Dan upora proti okupatorju",
		date: new Date("2027-04-27"),
		countryCode: "SI"
	},
	{
		name: "Praznik dela",
		date: new Date("2027-05-01"),
		countryCode: "SI"
	},
	{
		name: "Praznik dela",
		date: new Date("2027-05-02"),
		countryCode: "SI"
	},
	{
		name: "Binkošti",
		date: new Date("2027-05-16"),
		countryCode: "SI"
	},
	{
		name: "Dan državnosti",
		date: new Date("2027-06-25"),
		countryCode: "SI"
	},
	{
		name: "Marijino vnebovzetje",
		date: new Date("2027-08-15"),
		countryCode: "SI"
	},
	{
		name: "Dan reformacije",
		date: new Date("2027-10-31"),
		countryCode: "SI"
	},
	{
		name: "Dan spomina na mrtve",
		date: new Date("2027-11-01"),
		countryCode: "SI"
	},
	{
		name: "Božič",
		date: new Date("2027-12-25"),
		countryCode: "SI"
	},
	{
		name: "Dan samostojnosti in enotnosti",
		date: new Date("2027-12-26"),
		countryCode: "SI"
	}
]

export const HolidayFactory = setSeederFactory(HolidayEntity, async () => {
	const next = predefinedHolidays.shift()
	if (!next) {
		throw new Error("No more predefined holidays left to seed.")
	}

	const holiday = new HolidayEntity()
	holiday.name = next.name!
	holiday.date = next.date!
	holiday.countryCode = next.countryCode!
	holiday.state = null
	holiday.region = null

	return holiday
})

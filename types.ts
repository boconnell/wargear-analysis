type TerritoryId = string;
type PlayerId = string;
type UnitCount = number;
type Territory = {
  id: TerritoryId;
  seat: PlayerId;
  unitcount: UnitCount;
};

type RawTerritory = {
  "@attributes": {
    tid: string;
    seat: string;
    unitcount: string;
  };
};

type ContinentId = string;
type Bonus = number;
type ContinentName = string;
type Continent = {
  bonus: Bonus;
  members: TerritoryId[];
  name: ContinentName;
};

type PreParsedContinent = {
  bonus: string;
  members: string;
  name: string;
};

type PreParsedBorder = {
  fromid: string;
  toid: string;
};

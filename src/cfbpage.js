import React, { useState, useEffect } from "react";

// CFB-specific configuration
function weekLabel(week, season) {
  if (week === 0) return "Week 0";
  if (week >= 1 && week <= 15) return `Week ${week}`;
  if (week >= 16 && week <= 20) return `Bowl Season`;
  if (week === 21) return `National Championship`;
  return `Week ${week}`;
}

const availableWeeks2025 = [...Array(22).keys()].filter((w) => w >= 0);

const CONFERENCES = {
  ALL: "All Games",
  TOP25: "Top 25",
  FBS: "FBS Only",
  FCS: "FCS Only",
  SEC: "SEC",
  BIG10: "Big Ten",
  BIG12: "Big 12",
  PAC12: "Pac-12",
  ACC: "ACC",
  AAC: "American",
  CUSA: "Conference USA",
  MAC: "MAC",
  MWC: "Mountain West",
  SBC: "Sun Belt",
  IND: "Independents",
  IVY: "Ivy League",
  BIGSKY: "Big Sky",
  MVC: "Missouri Valley",
  SOUTHERN: "Southern",
  BIGSOUTH: "Big South",
  CAA: "CAA",
  MEAC: "MEAC",
  MVFC: "MVFC",
  NEC: "NEC",
  PATRIOT: "Patriot",
  PIONEER: "Pioneer",
  SOUTHLAND: "Southland",
  SWAC: "SWAC",
  UAC: "UAC",
  FCSIND: "FCS Independents",
};

const teamConferences = {
  // SEC
  Alabama: "SEC",
  Georgia: "SEC",
  LSU: "SEC",
  Florida: "SEC",
  Auburn: "SEC",
  Tennessee: "SEC",
  "Texas A&M": "SEC",
  Arkansas: "SEC",
  "Mississippi State": "SEC",
  "Ole Miss": "SEC",
  Missouri: "SEC",
  Kentucky: "SEC",
  "South Carolina": "SEC",
  Vanderbilt: "SEC",
  Oklahoma: "SEC",
  Texas: "SEC",

  // Big Ten
  Michigan: "BIG10",
  "Ohio State": "BIG10",
  "Penn State": "BIG10",
  Wisconsin: "BIG10",
  Iowa: "BIG10",
  Minnesota: "BIG10",
  Nebraska: "BIG10",
  Northwestern: "BIG10",
  Purdue: "BIG10",
  Illinois: "BIG10",
  Indiana: "BIG10",
  Maryland: "BIG10",
  Rutgers: "BIG10",
  USC: "BIG10",
  UCLA: "BIG10",
  Oregon: "BIG10",
  Washington: "BIG10",
  "Michigan State": "BIG10",

  // Big 12
  "Oklahoma State": "BIG12",
  TCU: "BIG12",
  "Texas Tech": "BIG12",
  Baylor: "BIG12",
  "Iowa State": "BIG12",
  Kansas: "BIG12",
  "Kansas State": "BIG12",
  "West Virginia": "BIG12",
  Arizona: "BIG12",
  "Arizona State": "BIG12",
  Colorado: "BIG12",
  Utah: "BIG12",
  BYU: "BIG12",
  Cincinnati: "BIG12",
  Houston: "BIG12",
  UCF: "BIG12",

  // ACC
  Clemson: "ACC",
  "Florida State": "ACC",
  Miami: "ACC",
  "North Carolina": "ACC",
  "NC State": "ACC",
  Pittsburgh: "ACC",
  Virginia: "ACC",
  "Virginia Tech": "ACC",
  "Wake Forest": "ACC",
  "Boston College": "ACC",
  Duke: "ACC",
  "Georgia Tech": "ACC",
  Louisville: "ACC",
  Syracuse: "ACC",
  California: "ACC",
  Stanford: "ACC",
  SMU: "ACC",

  // Pac-12
  "Oregon State": "PAC12",
  "Washington State": "PAC12",

  // American Athletic Conference
  Tulane: "AAC",
  Memphis: "AAC",
  Tulsa: "AAC",
  USF: "AAC",
  Temple: "AAC",
  "East Carolina": "AAC",
  Navy: "AAC",
  Charlotte: "AAC",
  "Florida Atlantic": "AAC",
  "North Texas": "AAC",
  Rice: "AAC",
  UTSA: "AAC",
  UAB: "AAC",
  Army: "AAC",

  // Conference USA
  Liberty: "CUSA",
  "New Mexico State": "CUSA",
  "Jacksonville State": "CUSA",
  "Sam Houston State": "CUSA",
  "Western Kentucky": "CUSA",
  "Middle Tennessee": "CUSA",
  "Louisiana Tech": "CUSA",
  FIU: "CUSA",
  Delaware: "CUSA",
  "Kennesaw State": "CUSA",
  "Missouri State": "CUSA",
  UTEP: "CUSA",

  // Mountain West
  "Boise State": "MWC",
  "San Diego State": "MWC",
  "Fresno State": "MWC",
  "Air Force": "MWC",
  "Colorado State": "MWC",
  "Utah State": "MWC",
  Wyoming: "MWC",
  "San José State": "MWC",
  Nevada: "MWC",
  UNLV: "MWC",
  "Hawai'i": "MWC",
  "New Mexico": "MWC",

  // Sun Belt
  "App State": "SBC",
  "Coastal Carolina": "SBC",
  Louisiana: "SBC",
  Marshall: "SBC",
  "James Madison": "SBC",
  "Georgia Southern": "SBC",
  "Georgia State": "SBC",
  Troy: "SBC",
  "South Alabama": "SBC",
  "Texas State": "SBC",
  "Arkansas State": "SBC",
  ULM: "SBC",
  "Southern Miss": "SBC",
  "Old Dominion": "SBC",

  // MAC
  Toledo: "MAC",
  Ohio: "MAC",
  "Western Michigan": "MAC",
  "Central Michigan": "MAC",
  "Eastern Michigan": "MAC",
  "Ball State": "MAC",
  "Northern Illinois": "MAC",
  Buffalo: "MAC",
  "Kent State": "MAC",
  "Miami (OH)": "MAC",
  Akron: "MAC",
  "Bowling Green": "MAC",
  Massachusetts: "MAC",

  // Independents
  "Notre Dame": "IND",
  UConn: "IND",
};

// FCS Teams
const fcsTeams = {
  // MVFC
  "North Dakota State": { conference: "MVFC", division: "FCS" },
  "South Dakota State": { conference: "MVFC", division: "FCS" },
  "Indiana State": { conference: "MVFC", division: "FCS" },
  "Youngstown State": { conference: "MVFC", division: "FCS" },
  "Illinois State": { conference: "MVFC", division: "FCS" },
  "Northern Iowa": { conference: "MVFC", division: "FCS" },
  "Murray State": { conference: "MVFC", division: "FCS" },
  "Southern Illinois": { conference: "MVFC", division: "FCS" },
  "North Dakota": { conference: "MVFC", division: "FCS" },
  "South Dakota": { conference: "MVFC", division: "FCS" },

  // Big Sky
  Montana: { conference: "BIGSKY", division: "FCS" },
  "Montana State": { conference: "BIGSKY", division: "FCS" },
  "Idaho State": { conference: "BIGSKY", division: "FCS" },
  "Eastern Washington": { conference: "BIGSKY", division: "FCS" },
  "Weber State": { conference: "BIGSKY", division: "FCS" },
  "Cal Poly": { conference: "BIGSKY", division: "FCS" },
  "Northern Arizona": { conference: "BIGSKY", division: "FCS" },
  "Sacramento State": { conference: "BIGSKY", division: "FCS" },
  "Portland State": { conference: "BIGSKY", division: "FCS" },
  Idaho: { conference: "BIGSKY", division: "FCS" },
  "UC Davis": { conference: "BIGSKY", division: "FCS" },
  "Northern Colorado": { conference: "BIGSKY", division: "FCS" },

  // CAA
  Villanova: { conference: "CAA", division: "FCS" },
  "New Hampshire": { conference: "CAA", division: "FCS" },
  "William & Mary": { conference: "CAA", division: "FCS" },
  Elon: { conference: "CAA", division: "FCS" },
  Towson: { conference: "CAA", division: "FCS" },
  UAlbany: { conference: "CAA", division: "FCS" },
  "Stony Brook": { conference: "CAA", division: "FCS" },
  Maine: { conference: "CAA", division: "FCS" },
  Bryant: { conference: "CAA", division: "FCS" },
  Campbell: { conference: "CAA", division: "FCS" },
  Hampton: { conference: "CAA", division: "FCS" },
  Monmouth: { conference: "CAA", division: "FCS" },
  "North Carolina A&T": { conference: "CAA", division: "FCS" },
  "Rhode Island": { conference: "CAA", division: "FCS" },

  // Southern
  Chattanooga: { conference: "SOUTHERN", division: "FCS" },
  Furman: { conference: "SOUTHERN", division: "FCS" },
  Mercer: { conference: "SOUTHERN", division: "FCS" },
  Samford: { conference: "SOUTHERN", division: "FCS" },
  "The Citadel": { conference: "SOUTHERN", division: "FCS" },
  VMI: { conference: "SOUTHERN", division: "FCS" },
  "Western Carolina": { conference: "SOUTHERN", division: "FCS" },
  Wofford: { conference: "SOUTHERN", division: "FCS" },
  "East Tennessee State": { conference: "SOUTHERN", division: "FCS" },

  // Big South
  "Tennessee State": { conference: "BIGSOUTH", division: "FCS" },
  SEMO: { conference: "BIGSOUTH", division: "FCS" },
  "UT Martin": { conference: "BIGSOUTH", division: "FCS" },
  "Eastern Illinois": { conference: "BIGSOUTH", division: "FCS" },
  Lindenwood: { conference: "BIGSOUTH", division: "FCS" },
  "Charleston Southern": { conference: "BIGSOUTH", division: "FCS" },
  "Gardner-Webb": { conference: "BIGSOUTH", division: "FCS" },
  "Tennessee Tech": { conference: "BIGSOUTH", division: "FCS" },
  "Western Illinois": { conference: "BIGSOUTH", division: "FCS" },

  // Patriot
  "Holy Cross": { conference: "PATRIOT", division: "FCS" },
  Lafayette: { conference: "PATRIOT", division: "FCS" },
  Lehigh: { conference: "PATRIOT", division: "FCS" },
  Colgate: { conference: "PATRIOT", division: "FCS" },
  Bucknell: { conference: "PATRIOT", division: "FCS" },
  Fordham: { conference: "PATRIOT", division: "FCS" },
  Georgetown: { conference: "PATRIOT", division: "FCS" },
  Richmond: { conference: "PATRIOT", division: "FCS" },

  // Pioneer
  Davidson: { conference: "PIONEER", division: "FCS" },
  Dayton: { conference: "PIONEER", division: "FCS" },
  Drake: { conference: "PIONEER", division: "FCS" },
  Butler: { conference: "PIONEER", division: "FCS" },
  Marist: { conference: "PIONEER", division: "FCS" },
  "Morehead State": { conference: "PIONEER", division: "FCS" },
  "San Diego": { conference: "PIONEER", division: "FCS" },
  "Saint Thomas": { conference: "PIONEER", division: "FCS" },
  Stetson: { conference: "PIONEER", division: "FCS" },
  Valparaiso: { conference: "PIONEER", division: "FCS" },
  Presbyterian: { conference: "PIONEER", division: "FCS" },

  // NEC
  Duquesne: { conference: "NEC", division: "FCS" },
  "Central Connecticut": { conference: "NEC", division: "FCS" },
  Stonehill: { conference: "NEC", division: "FCS" },
  "St. Francis (PA)": { conference: "NEC", division: "FCS" },
  Wagner: { conference: "NEC", division: "FCS" },
  LIU: { conference: "NEC", division: "FCS" },
  Mercyhurst: { conference: "NEC", division: "FCS" },
  "New Haven": { conference: "NEC", division: "FCS" },
  "Robert Morris": { conference: "NEC", division: "FCS" },

  // Ivy
  Harvard: { conference: "IVY", division: "FCS" },
  Yale: { conference: "IVY", division: "FCS" },
  Princeton: { conference: "IVY", division: "FCS" },
  Dartmouth: { conference: "IVY", division: "FCS" },
  Columbia: { conference: "IVY", division: "FCS" },
  Cornell: { conference: "IVY", division: "FCS" },
  Brown: { conference: "IVY", division: "FCS" },
  Penn: { conference: "IVY", division: "FCS" },

  // MEAC
  Howard: { conference: "MEAC", division: "FCS" },
  "Morgan State": { conference: "MEAC", division: "FCS" },
  "Norfolk State": { conference: "MEAC", division: "FCS" },
  "Delaware State": { conference: "MEAC", division: "FCS" },
  "North Carolina Central": { conference: "MEAC", division: "FCS" },
  "South Carolina State": { conference: "MEAC", division: "FCS" },

  // SWAC
  "Alabama A&M": { conference: "SWAC", division: "FCS" },
  "Alabama State": { conference: "SWAC", division: "FCS" },
  "Alcorn State": { conference: "SWAC", division: "FCS" },
  "Bethune-Cookman": { conference: "SWAC", division: "FCS" },
  "Florida A&M": { conference: "SWAC", division: "FCS" },
  "Grambling State": { conference: "SWAC", division: "FCS" },
  "Jackson State": { conference: "SWAC", division: "FCS" },
  "Mississippi Valley State": { conference: "SWAC", division: "FCS" },
  "Prairie View A&M": { conference: "SWAC", division: "FCS" },
  Southern: { conference: "SWAC", division: "FCS" },
  "Texas Southern": { conference: "SWAC", division: "FCS" },
  "Arkansas-Pine Bluff": { conference: "SWAC", division: "FCS" },

  // FCS Independents
  "Sacred Heart": { conference: "FCSIND", division: "FCS" },
  Merrimack: { conference: "FCSIND", division: "FCS" },

  // Southland
  Nicholls: { conference: "SOUTHLAND", division: "FCS" },
  "Houston christian": { conference: "SOUTHLAND", division: "FCS" },
  McNeese: { conference: "SOUTHLAND", division: "FCS" },
  "Northwestern State": { conference: "SOUTHLAND", division: "FCS" },
  "Southeastern Louisiana": { conference: "SOUTHLAND", division: "FCS" },
  Lamar: { conference: "SOUTHLAND", division: "FCS" },
  "Incarnate Word": { conference: "SOUTHLAND", division: "FCS" },
  "Stephen F. Austin": { conference: "SOUTHLAND", division: "FCS" },
  UTRGV: { conference: "SOUTHLAND", division: "FCS" },
  "East Texas A&M": { conference: "SOUTHLAND", division: "FCS" },

  // UAC
  "Tarenton State": { conference: "UAC", division: "FCS" },
  "Austin Peay": { conference: "UAC", division: "FCS" },
  "Eastern Kentucky": { conference: "UAC", division: "FCS" },
  "Southern Utah": { conference: "UAC", division: "FCS" },
  "West Georgia": { conference: "UAC", division: "FCS" },
  "Aberlene Christian": { conference: "UAC", division: "FCS" },
  "Central Arkansas": { conference: "UAC", division: "FCS" },
  "North Alabama": { conference: "UAC", division: "FCS" },
  "Utah Tech": { conference: "UAC", division: "FCS" },
};

const TOP_25_TEAMS = new Set([
  "Alabama",
  "Ohio State",
  "Georgia",
  "Michigan",
  "Clemson",
  "LSU",
  "Texas",
  "Oklahoma",
  "Notre Dame",
  "Arizona State",
  "Illinois",
  "Penn State",
  "Oregon",
  "Florida",
  "South Carolina",
  "Michigan",
  "Texas A&M",
  "Miami",
  "SMU",
  "Kansas State",
  "Indiana",
  "Iowa State",
  "Texas Tech",
  "Tennessee",
  "Boise State",
]);

// Complete Division 1 team logos (FBS + FCS)
const teamLogos = {
  Alabama: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png",
  "Ohio State": "https://a.espncdn.com/i/teamlogos/ncaa/500/194.png",
  Georgia: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png",
  Michigan: "https://a.espncdn.com/i/teamlogos/ncaa/500/130.png",
  Clemson: "https://a.espncdn.com/i/teamlogos/ncaa/500/228.png",
  LSU: "https://a.espncdn.com/i/teamlogos/ncaa/500/99.png",
  Texas: "https://a.espncdn.com/i/teamlogos/ncaa/500/251.png",
  Oklahoma: "https://a.espncdn.com/i/teamlogos/ncaa/500/201.png",
  "Notre Dame": "https://a.espncdn.com/i/teamlogos/ncaa/500/87.png",
  USC: "https://a.espncdn.com/i/teamlogos/ncaa/500/30.png",
  "Florida State": "https://a.espncdn.com/i/teamlogos/ncaa/500/52.png",
  "Penn State": "https://a.espncdn.com/i/teamlogos/ncaa/500/213.png",
  Oregon: "https://a.espncdn.com/i/teamlogos/ncaa/500/2483.png",
  Florida: "https://a.espncdn.com/i/teamlogos/ncaa/500/57.png",
  Auburn: "https://a.espncdn.com/i/teamlogos/ncaa/500/2.png",
  Tennessee: "https://a.espncdn.com/i/teamlogos/ncaa/500/2633.png",
  "Texas A&M": "https://a.espncdn.com/i/teamlogos/ncaa/500/245.png",
  Miami: "https://a.espncdn.com/i/teamlogos/ncaa/500/2390.png",
  Washington: "https://a.espncdn.com/i/teamlogos/ncaa/500/264.png",
  Wisconsin: "https://a.espncdn.com/i/teamlogos/ncaa/500/275.png",
  Cincinnati: "https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png",
  UCF: "https://a.espncdn.com/i/teamlogos/ncaa/500/2116.png",
  Houston: "https://a.espncdn.com/i/teamlogos/ncaa/500/248.png",
  BYU: "https://a.espncdn.com/i/teamlogos/ncaa/500/252.png",
  "Boise State": "https://a.espncdn.com/i/teamlogos/ncaa/500/68.png",
  "San Diego State": "https://a.espncdn.com/i/teamlogos/ncaa/500/21.png",
  "Fresno State": "https://a.espncdn.com/i/teamlogos/ncaa/500/278.png",
  "Utah State": "https://a.espncdn.com/i/teamlogos/ncaa/500/328.png",
  "Air Force": "https://a.espncdn.com/i/teamlogos/ncaa/500/2005.png",
  Army: "https://a.espncdn.com/i/teamlogos/ncaa/500/349.png",
  Navy: "https://a.espncdn.com/i/teamlogos/ncaa/500/2426.png",
  Tulane: "https://a.espncdn.com/i/teamlogos/ncaa/500/2655.png",
  Memphis: "https://a.espncdn.com/i/teamlogos/ncaa/500/235.png",
  SMU: "https://a.espncdn.com/i/teamlogos/ncaa/500/2567.png",
  Tulsa: "https://a.espncdn.com/i/teamlogos/ncaa/500/202.png",
  "Coastal Carolina": "https://a.espncdn.com/i/teamlogos/ncaa/500/324.png",
  Louisiana: "https://a.espncdn.com/i/teamlogos/ncaa/500/309.png",
  Liberty: "https://a.espncdn.com/i/teamlogos/ncaa/500/2335.png",
  Marshall: "https://a.espncdn.com/i/teamlogos/ncaa/500/276.png",
  "North Dakota State": "https://a.espncdn.com/i/teamlogos/ncaa/500/77.png",
  "South Dakota State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2571.png",
  "Montana State": "https://a.espncdn.com/i/teamlogos/ncaa/500/147.png",
  "James Madison": "https://a.espncdn.com/i/teamlogos/ncaa/500/256.png",
  "Sam Houston State": "https://a.espncdn.com/i/teamlogos/ncaa/500/204.png",
  "Jacksonville State": "https://a.espncdn.com/i/teamlogos/ncaa/500/55.png",
  "Eastern Washington": "https://a.espncdn.com/i/teamlogos/ncaa/500/331.png",
  "Weber State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2692.png",
  Villanova: "https://a.espncdn.com/i/teamlogos/ncaa/500/222.png",
  "New Hampshire": "https://a.espncdn.com/i/teamlogos/ncaa/500/160.png",
  Richmond: "https://a.espncdn.com/i/teamlogos/ncaa/500/257.png",
  "William & Mary": "https://a.espncdn.com/i/teamlogos/ncaa/500/2729.png",
  Elon: "https://a.espncdn.com/i/teamlogos/ncaa/500/2210.png",
  Arkansas: "https://a.espncdn.com/i/teamlogos/ncaa/500/8.png",
  "Mississippi State": "https://a.espncdn.com/i/teamlogos/ncaa/500/344.png",
  "Ole Miss": "https://a.espncdn.com/i/teamlogos/ncaa/500/145.png",
  Missouri: "https://a.espncdn.com/i/teamlogos/ncaa/500/142.png",
  Kentucky: "https://a.espncdn.com/i/teamlogos/ncaa/500/96.png",
  "South Carolina": "https://a.espncdn.com/i/teamlogos/ncaa/500/2579.png",
  Vanderbilt: "https://a.espncdn.com/i/teamlogos/ncaa/500/238.png",
  Iowa: "https://a.espncdn.com/i/teamlogos/ncaa/500/2294.png",
  Minnesota: "https://a.espncdn.com/i/teamlogos/ncaa/500/135.png",
  Nebraska: "https://a.espncdn.com/i/teamlogos/ncaa/500/158.png",
  Northwestern: "https://a.espncdn.com/i/teamlogos/ncaa/500/77.png",
  Purdue: "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png",
  Illinois: "https://a.espncdn.com/i/teamlogos/ncaa/500/356.png",
  Indiana: "https://a.espncdn.com/i/teamlogos/ncaa/500/84.png",
  Maryland: "https://a.espncdn.com/i/teamlogos/ncaa/500/120.png",
  Rutgers: "https://a.espncdn.com/i/teamlogos/ncaa/500/164.png",
  California: "https://a.espncdn.com/i/teamlogos/ncaa/500/25.png",
  Stanford: "https://a.espncdn.com/i/teamlogos/ncaa/500/24.png",
  UCLA: "https://a.espncdn.com/i/teamlogos/ncaa/500/26.png",
  Arizona: "https://a.espncdn.com/i/teamlogos/ncaa/500/12.png",
  "Arizona State": "https://a.espncdn.com/i/teamlogos/ncaa/500/9.png",
  Colorado: "https://a.espncdn.com/i/teamlogos/ncaa/500/38.png",
  Utah: "https://a.espncdn.com/i/teamlogos/ncaa/500/254.png",
  "Washington State": "https://a.espncdn.com/i/teamlogos/ncaa/500/265.png",
  "Oregon State": "https://a.espncdn.com/i/teamlogos/ncaa/500/204.png",
  Baylor: "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png",
  "Iowa State": "https://a.espncdn.com/i/teamlogos/ncaa/500/66.png",
  Kansas: "https://a.espncdn.com/i/teamlogos/ncaa/500/2305.png",
  "Kansas State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2306.png",
  "Oklahoma State": "https://a.espncdn.com/i/teamlogos/ncaa/500/197.png",
  TCU: "https://a.espncdn.com/i/teamlogos/ncaa/500/2628.png",
  "Texas Tech": "https://a.espncdn.com/i/teamlogos/ncaa/500/2641.png",
  "West Virginia": "https://a.espncdn.com/i/teamlogos/ncaa/500/277.png",
  "Boston College": "https://a.espncdn.com/i/teamlogos/ncaa/500/103.png",
  Duke: "https://a.espncdn.com/i/teamlogos/ncaa/500/150.png",
  "Georgia Tech": "https://a.espncdn.com/i/teamlogos/ncaa/500/59.png",
  Louisville: "https://a.espncdn.com/i/teamlogos/ncaa/500/97.png",
  "North Carolina": "https://a.espncdn.com/i/teamlogos/ncaa/500/153.png",
  "NC State": "https://a.espncdn.com/i/teamlogos/ncaa/500/152.png",
  Pittsburgh: "https://a.espncdn.com/i/teamlogos/ncaa/500/221.png",
  Syracuse: "https://a.espncdn.com/i/teamlogos/ncaa/500/183.png",
  Virginia: "https://a.espncdn.com/i/teamlogos/ncaa/500/258.png",
  "Virginia Tech": "https://a.espncdn.com/i/teamlogos/ncaa/500/259.png",
  UNLV: "https://a.espncdn.com/i/teamlogos/ncaa/500/2439.png",
  "Wake Forest": "https://a.espncdn.com/i/teamlogos/ncaa/500/154.png",
  "Hawai'i": "https://a.espncdn.com/i/teamlogos/ncaa/500/62.png",
  "Western Kentucky": "https://a.espncdn.com/i/teamlogos/ncaa/500/98.png",
  "Idaho State": "https://a.espncdn.com/i/teamlogos/ncaa/500/304.png",
  USF: "https://a.espncdn.com/i/teamlogos/ncaa/500/58.png",
  Ohio: "https://a.espncdn.com/i/teamlogos/ncaa/500/195.png",
  Lafayette: "https://a.espncdn.com/i/teamlogos/ncaa/500/322.png",
  "Bowling Green": "https://a.espncdn.com/i/teamlogos/ncaa/500/189.png",
  "East Carolina": "https://a.espncdn.com/i/teamlogos/ncaa/500/151.png",
  "Delaware State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2169.png",
  Delaware: "https://a.espncdn.com/i/teamlogos/ncaa/500/48.png",
  "Saint Francis": "https://a.espncdn.com/i/teamlogos/ncaa/500/2598.png",
  ULM: "https://a.espncdn.com/i/teamlogos/ncaa/500/2433.png",
  Wyoming: "https://a.espncdn.com/i/teamlogos/ncaa/500/2751.png",
  Akron: "https://a.espncdn.com/i/teamlogos/ncaa/500/2006.png",
  "Central Arkansas": "https://a.espncdn.com/i/teamlogos/ncaa/500/2110.png",
  "UT Martin": "https://a.espncdn.com/i/teamlogos/ncaa/500/2630.png",
  Buffalo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2084.png",
  "Stephen F. Austin": "https://a.espncdn.com/i/teamlogos/ncaa/500/2617.png",
  "Alabama State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2011.png",
  UAB: "https://a.espncdn.com/i/teamlogos/ncaa/500/5.png",
  "Miami (OH)": "https://a.espncdn.com/i/teamlogos/ncaa/500/193.png",
  "Stony Brook": "https://a.espncdn.com/i/teamlogos/ncaa/500/2619.png",
  "Tarleton State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2627.png",
  "Western Michigan": "https://a.espncdn.com/i/teamlogos/ncaa/500/2711.png",
  "Michigan State": "https://a.espncdn.com/i/teamlogos/ncaa/500/127.png",
  "Kennesaw State": "https://a.espncdn.com/i/teamlogos/ncaa/500/338.png",
  "App State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2026.png",
  Charlotte: "https://a.espncdn.com/i/teamlogos/ncaa/500/2429.png",
  "Western Illinois": "https://a.espncdn.com/i/teamlogos/ncaa/500/2710.png",
  "Bethune-Cookman": "https://a.espncdn.com/i/teamlogos/ncaa/500/2065.png",
  Wagner: "https://a.espncdn.com/i/teamlogos/ncaa/500/2681.png",
  FIU: "https://a.espncdn.com/i/teamlogos/ncaa/500/2229.png",
  "Central Michigan": "https://a.espncdn.com/i/teamlogos/ncaa/500/2117.png",
  "San José State": "https://a.espncdn.com/i/teamlogos/ncaa/500/23.png",
  "Southern Miss": "https://a.espncdn.com/i/teamlogos/ncaa/500/2572.png",
  "Florida Atlantic": "https://a.espncdn.com/i/teamlogos/ncaa/500/2226.png",
  "Ball State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2050.png",
  Duquesne: "https://a.espncdn.com/i/teamlogos/ncaa/500/2184.png",
  Merrimack: "https://a.espncdn.com/i/teamlogos/ncaa/500/2771.png",
  "Kent State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2309.png",
  "Robert Morris": "https://a.espncdn.com/i/teamlogos/ncaa/500/2523.png",
  "Central Connecticut": "https://a.espncdn.com/i/teamlogos/ncaa/500/2115.png",
  UConn: "https://a.espncdn.com/i/teamlogos/ncaa/500/41.png",
  Toledo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2649.png",
  VMI: "https://a.espncdn.com/i/teamlogos/ncaa/500/2678.png",
  Fordham: "https://a.espncdn.com/i/teamlogos/ncaa/500/2230.png",
  "Old Dominion": "https://a.espncdn.com/i/teamlogos/ncaa/500/295.png",
  "Eastern Kentucky": "https://a.espncdn.com/i/teamlogos/ncaa/500/2198.png",
  "South Dakota": "https://a.espncdn.com/i/teamlogos/ncaa/500/233.png",
  Nevada: "https://a.espncdn.com/i/teamlogos/ncaa/500/2440.png",
  Bucknell: "https://a.espncdn.com/i/teamlogos/ncaa/500/2083.png",
  Temple: "https://a.espncdn.com/i/teamlogos/ncaa/500/218.png",
  Massachusetts: "https://a.espncdn.com/i/teamlogos/ncaa/500/113.png",
  "Holy Cross": "https://a.espncdn.com/i/teamlogos/ncaa/500/107.png",
  "Northern Illinois": "https://a.espncdn.com/i/teamlogos/ncaa/500/2459.png",
  Maine: "https://a.espncdn.com/i/teamlogos/ncaa/500/311.png",
  "Alabama A&M": "https://a.espncdn.com/i/teamlogos/ncaa/500/2010.png",
  Chattanooga: "https://a.espncdn.com/i/teamlogos/ncaa/500/236.png",
  "Illinois State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2287.png",
  UAlbany: "https://a.espncdn.com/i/teamlogos/ncaa/500/399.png",
  "Long Island University":
    "https://a.espncdn.com/i/teamlogos/ncaa/500/2341.png",
  "North Dakota": "https://a.espncdn.com/i/teamlogos/ncaa/500/155.png",
  UTSA: "https://a.espncdn.com/i/teamlogos/ncaa/500/2636.png",
  "Charleston Southern": "https://a.espncdn.com/i/teamlogos/ncaa/500/2127.png",
  "Austin Peay": "https://a.espncdn.com/i/teamlogos/ncaa/500/2046.png",
  "Middle Tennessee": "https://a.espncdn.com/i/teamlogos/ncaa/500/2393.png",
  "North Alabama": "https://a.espncdn.com/i/teamlogos/ncaa/500/2453.png",
  "Southeast Missouri State":
    "https://a.espncdn.com/i/teamlogos/ncaa/500/2546.png",
  "Arkansas State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2032.png",
  "Morgan State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2415.png",
  "South Alabama": "https://a.espncdn.com/i/teamlogos/ncaa/500/6.png",
  Nicholls: "https://a.espncdn.com/i/teamlogos/ncaa/500/2447.png",
  Troy: "https://a.espncdn.com/i/teamlogos/ncaa/500/2653.png",
  "New Mexico": "https://a.espncdn.com/i/teamlogos/ncaa/500/167.png",
  "Arkansas-Pine Bluff": "https://a.espncdn.com/i/teamlogos/ncaa/500/2029.png",
  "Missouri State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2623.png",
  "SE Louisiana": "https://a.espncdn.com/i/teamlogos/ncaa/500/2545.png",
  "Louisiana Tech": "https://a.espncdn.com/i/teamlogos/ncaa/500/2348.png",
  UTEP: "https://a.espncdn.com/i/teamlogos/ncaa/500/2638.png",
  "Georgia State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2247.png",
  "Portland State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2502.png",
  Rice: "https://a.espncdn.com/i/teamlogos/ncaa/500/242.png",
  "Eastern Michigan": "https://a.espncdn.com/i/teamlogos/ncaa/500/2199.png",
  "Texas State": "https://a.espncdn.com/i/teamlogos/ncaa/500/326.png",
  Lamar: "https://a.espncdn.com/i/teamlogos/ncaa/500/2320.png",
  "North Texas": "https://a.espncdn.com/i/teamlogos/ncaa/500/249.png",
  "Abilene Christian": "https://a.espncdn.com/i/teamlogos/ncaa/500/2000.png",
  Bryant: "https://a.espncdn.com/i/teamlogos/ncaa/500/2803.png",
  "New Mexico State": "https://a.espncdn.com/i/teamlogos/ncaa/500/166.png",
  "East Texas A&M": "https://a.espncdn.com/i/teamlogos/ncaa/500/2837.png",
  "Georgia Southern": "https://a.espncdn.com/i/teamlogos/ncaa/500/290.png",
  "Northern Arizona": "https://a.espncdn.com/i/teamlogos/ncaa/500/2464.png",
  Idaho: "https://a.espncdn.com/i/teamlogos/ncaa/500/70.png",
  "Colorado State": "https://a.espncdn.com/i/teamlogos/ncaa/500/36.png",
  "Cal Poly": "https://a.espncdn.com/i/teamlogos/ncaa/500/13.png",
  "Northern Colorado": "https://a.espncdn.com/i/teamlogos/ncaa/500/2458.png",
  "UC Davis": "https://a.espncdn.com/i/teamlogos/ncaa/500/302.png",
  Montana: "https://a.espncdn.com/i/teamlogos/ncaa/500/149.png",
  "Sacramento State": "https://a.espncdn.com/i/teamlogos/ncaa/500/16.png",
  "Rhode Island": "https://a.espncdn.com/i/teamlogos/ncaa/500/227.png",
  Monmouth: "https://a.espncdn.com/i/teamlogos/ncaa/500/2405.png",
  Townson: "https://a.espncdn.com/i/teamlogos/ncaa/500/119.png",
  Hampton: "https://a.espncdn.com/i/teamlogos/ncaa/500/2261.png",
  "North Carolina A&T": "https://a.espncdn.com/i/teamlogos/ncaa/500/2448.png",
  Campbell: "https://a.espncdn.com/i/teamlogos/ncaa/500/2097.png",
  "Sacred Heart": "https://a.espncdn.com/i/teamlogos/ncaa/500/2529.png",
  Brown: "https://a.espncdn.com/i/teamlogos/ncaa/500/225.png",
  Columbia: "https://a.espncdn.com/i/teamlogos/ncaa/500/171.png",
  Dartmouth: "https://a.espncdn.com/i/teamlogos/ncaa/500/159.png",
  Harvard: "https://a.espncdn.com/i/teamlogos/ncaa/500/108.png",
  Penn: "https://a.espncdn.com/i/teamlogos/ncaa/500/219.png",
  Princeton: "https://a.espncdn.com/i/teamlogos/ncaa/500/163.png",
  Yale: "https://a.espncdn.com/i/teamlogos/ncaa/500/43.png",
  Howard: "https://a.espncdn.com/i/teamlogos/ncaa/500/47.png",
  "South Carolina State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2569.png",
  "North Carolina Central":
    "https://a.espncdn.com/i/teamlogos/ncaa/500/2428.png",
  "Norfolk State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2450.png",
  "Indiana State": "https://a.espncdn.com/i/teamlogos/ncaa/500/282.png",
  "Southern Illinois": "https://a.espncdn.com/i/teamlogos/ncaa/500/79.png",
  "Youngstown State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2754.png",
  "Murray State": "https://a.espncdn.com/i/teamlogos/ncaa/500/93.png",
  Mercyhurst: "https://a.espncdn.com/i/teamlogos/ncaa/500/2385.png",
  "New Haven": "https://a.espncdn.com/i/teamlogos/ncaa/500/2441.png",
  Stonehill: "https://a.espncdn.com/i/teamlogos/ncaa/500/284.png",
  "Eastern Illinois": "https://a.espncdn.com/i/teamlogos/ncaa/500/2197.png",
  "Gardner-Webb": "https://a.espncdn.com/i/teamlogos/ncaa/500/2241.png",
  "Tennessee State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2634.png",
  "Tennessee Tech": "https://a.espncdn.com/i/teamlogos/ncaa/500/2635.png",
  Lindenwood: "https://a.espncdn.com/i/teamlogos/ncaa/500/2815.png",
  Lehigh: "https://a.espncdn.com/i/teamlogos/ncaa/500/2329.png",
  Georgetown: "https://a.espncdn.com/i/teamlogos/ncaa/500/46.png",
  Colgate: "https://a.espncdn.com/i/teamlogos/ncaa/500/2142.png",
  Drake: "https://a.espncdn.com/i/teamlogos/ncaa/500/2181.png",
  Marist: "https://a.espncdn.com/i/teamlogos/ncaa/500/2368.png",
  "Morehead State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2413.png",
  Presbyterian: "https://a.espncdn.com/i/teamlogos/ncaa/500/2506.png",
  "Saint Thomas": "https://a.espncdn.com/i/teamlogos/ncaa/500/2900.png",
  Valparaiso: "https://a.espncdn.com/i/teamlogos/ncaa/500/2674.png",
  Butler: "https://a.espncdn.com/i/teamlogos/ncaa/500/2086.png",
  Davidson: "https://a.espncdn.com/i/teamlogos/ncaa/500/2166.png",
  Dayton: "https://a.espncdn.com/i/teamlogos/ncaa/500/2168.png",
  "San Diego": "https://a.espncdn.com/i/teamlogos/ncaa/500/301.png",
  Stetson: "https://a.espncdn.com/i/teamlogos/ncaa/500/56.png",
  "East Tennessee State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2193.png",
  Furman: "https://a.espncdn.com/i/teamlogos/ncaa/500/231.png",
  Mercer: "https://a.espncdn.com/i/teamlogos/ncaa/500/2382.png",
  Samford: "https://a.espncdn.com/i/teamlogos/ncaa/500/2535.png",
  "The Citadel": "https://a.espncdn.com/i/teamlogos/ncaa/500/2643.png",
  "Western Carolina": "https://a.espncdn.com/i/teamlogos/ncaa/500/2717.png",
  Wofford: "https://a.espncdn.com/i/teamlogos/ncaa/500/2747.png",
  "Houston Christian": "https://a.espncdn.com/i/teamlogos/ncaa/500/2277.png",
  McNeese: "https://a.espncdn.com/i/teamlogos/ncaa/500/2377.png",
  "Northwestern State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2466.png",
  "UT Rio Grande Valley": "https://a.espncdn.com/i/teamlogos/ncaa/500/292.png",
  "Incarnate Word": "https://a.espncdn.com/i/teamlogos/ncaa/500/2916.png",
  "Jackson State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2296.png",
  "Florida A&M": "https://a.espncdn.com/i/teamlogos/ncaa/500/50.png",
  "Mississippi Valley State":
    "https://a.espncdn.com/i/teamlogos/ncaa/500/2400.png",
  "Prairie View A&M": "https://a.espncdn.com/i/teamlogos/ncaa/500/2504.png",
  Grambling: "https://a.espncdn.com/i/teamlogos/ncaa/500/2755.png",
  "Alcorn State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2016.png",
  Southern: "https://a.espncdn.com/i/teamlogos/ncaa/500/2582.png",
  "Texas Southern": "https://a.espncdn.com/i/teamlogos/ncaa/500/2640.png",
  "Southern Utah": "https://a.espncdn.com/i/teamlogos/ncaa/500/253.png",
  "West Georgia": "https://a.espncdn.com/i/teamlogos/ncaa/500/2698.png",
  "Utah Tech": "https://a.espncdn.com/i/teamlogos/ncaa/500/3101.png",
  "Northern Iowa": "https://a.espncdn.com/i/teamlogos/ncaa/500/2460.png",
  Towson: "https://a.espncdn.com/i/teamlogos/ncaa/500/119.png",
};

// Map ESPN full college team names to simplified keys
function normalizeTeamName(name) {
  const map = {
    "Northern Iowa Panthers": "Northern Iowa",
    "Utah Tech Trailblazers": "Utah Tech",
    "West Georgia Wolves": "West Georgia",
    "Southern Utah Thunderbirds": "Southern Utah",
    "Texas Southern Tigers": "Texas Southern",
    "Southern Jaguars": "Southern",
    "Alcorn State Braves": "Alcorn State",
    "Grambling Tigers": "Grambling",
    "Prairie View A&M Panthers": "Prairie View A&M",
    "Mississippi Valley State Delta Devils": "Mississippi Valley State",
    "Florida A&M Rattlers": "Florida A&M",
    "Jackson State Tigers": "Jackson State",
    "Incarnate Word Cardinals": "Incarnate Word",
    "UT Rio Grande Valley Vaqueros": "UT Rio Grande Valley",
    "Northwestern State Demons": "Northwestern State",
    "McNeese Cowboys": "McNeese",
    "Houston Christian Huskies": "Houston Christian",
    "Wofford Terriers": "Wofford",
    "Western Carolina Catamounts": "Western Carolina",
    "The Citadel Bulldogs": "The Citadel",
    "Samford Bulldogs": "Samford",
    "Mercer Bears": "Mercer",
    "Furman Paladins": "Furman",
    "East Tennessee State Buccaneers": "East Tennessee State",
    "Stetson Hatters": "Stetson",
    "San Diego Toreros": "San Diego",
    "Dayton Flyers": "Dayton",
    "Davidson Wildcats": "Davidson",
    "Butler Bulldogs": "Butler",
    "Valparaiso Crusaders": "Valparaiso",
    "Saint Thomas-Minnesota Tommies": "Saint Thomas",
    "Presbyterian Blue Hose": "Presbyterian",
    "Morehead State Eagles": "Morehead State",
    "Marist Red Foxes": "Marist",
    "Drake Bulldogs": "Drake",
    "Colgate Raiders": "Colgate",
    "Georgetown Hoyas": "Georgetown",
    "Lehigh Mountain Hawks": "Lehigh",
    "Lindenwood Lions": "Lindenwood",
    "Tennessee Tech Golden Eagles": "Tennessee Tech",
    "Tennessee State Tigers": "Tennessee State",
    "Gardner-Webb Runnin' Bulldogs": "Gardner-Webb",
    "Eastern Illinois Panthers": "Eastern Illinois",
    "Stonehill Skyhawks": "Stonehill",
    "New Haven Chargers": "New Haven",
    "Murray State Racers": "Murray State",
    "Mercyhurst Lakers": "Mercyhurst",
    "Youngstown State Penguins": "Youngstown State",
    "Southern Illinois Salukis": "Southern Illinois",
    "Indiana State Sycamores": "Indiana State",
    "Norfolk State Spartans": "Norfolk State",
    "South Carolina State Bulldogs": "South Carolina State",
    "North Carolina Central Eagles": "North Carolina Central",
    "Howard Bison": "Howard",
    "Yale Bulldogs": "Yale",
    "Princeton Tigers": "Princeton",
    "Pennsylvania Quakers": "Penn",
    "Harvard Crimson": "Harvard",
    "Columbia Lions": "Columbia",
    "Dartmouth Big Green": "Dartmouth",
    "Brown Bears": "Brown",
    "Sacred Heart": "Sacred Heart",
    "Campbell Fighting Camels": "Campbell",
    "North Carolina A&T Aggies": "North Carolina A&T",
    "Hampton Pirates": "Hampton",
    "Towson Tigers": "Towson",
    "Monmouth Hawks": "Monmouth",
    "Rhode Island Rams": "Rhode Island",
    "Sacramento State Hornets": "Sacramento State",
    "Montana Grizzlies": "Montana",
    "UC Davis Aggies": "UC Davis",
    "Northern Colorado Bears": "Northern Colorado",
    "Cal Poly Mustangs": "Cal Poly",
    "Colorado State Rams": "Colorado State",
    "Idaho Vandals": "Idaho",
    "Northern Arizona Lumberjacks": "Northern Arizona",
    "Georgia Southern Eagles": "Georgia Southern",
    "East Texas A&M Lions": "East Texas A&M",
    "New Mexico State Aggies": "New Mexico State",
    "Bryant Bulldogs": "Bryant",
    "Abilene Christian Wildcats": "Abilene Christian",
    "North Texas Mean Green": "North Texas",
    "Lamar Cardinals": "Lamar",
    "Texas State Bobcats": "Texas State",
    "Eastern Michigan Eagles": "Eastern Michigan",
    "Rice Owls": "Rice",
    "Portland State Vikings": "Portland State",
    "Georgia State Panthers": "Georgia State",
    "UTEP Miners": "UTEP",
    "Louisiana Tech Bulldogs": "Louisiana Tech",
    "SE Louisiana Lions": "SE Louisiana",
    "Missouri State Bears": "Missouri State",
    "Arkansas-Pine Bluff Golden Lions": "Arkansas-Pine Bluff",
    "New Mexico Lobos": "New Mexico",
    "Troy Trojans": "Troy",
    "Nicholls Colonels": "Nicholls",
    "South Alabama Jaguars": "South Alabama",
    "Morgan State Bears": "Morgan State",
    "Arkansas State Red Wolves": "Arkansas State",
    "Southeast Missouri State Redhawks": "Southeast Missouri State",
    "North Alabama Lions": "North Alabama",
    "Middle Tennessee Blue Raiders": "Middle Tennessee",
    "Austin Peay Governors": "Austin Peay",
    "Charleston Southern Buccaneers": "Charleston Southern",
    "UTSA Roadrunners": "UTSA",
    "North Dakota Fighting Hawks": "North Dakota",
    "Long Island University Sharks": "Long Island University",
    "UAlbany Great Danes": "UAlbany",
    "Illinois State Redbirds": "Illinois State",
    "Chattanooga Mocs": "Chattanooga",
    "Alabama A&M Bulldogs": "Alabama A&M",
    "Maine Black Bears": "Maine",
    "Northern Illinois Huskies": "Northern Illinois",
    "Holy Cross Crusaders": "Holy Cross",
    "Massachusetts Minutemen": "Massachusetts",
    "Temple Owls": "Temple",
    "Bucknell Bison": "Bucknell",
    "Nevada Wolf Pack": "Nevada",
    "South Dakota Coyotes": "South Dakota",
    "Eastern Kentucky Colonels": "Eastern Kentucky",
    "Old Dominion Monarchs": "Old Dominion",
    "Fordham Rams": "Fordham",
    "VMI Keydets": "VMI",
    "Toledo Rockets": "Toledo",
    "UConn Huskies": "UConn",
    "Central Connecticut Blue Devils": "Central Connecticut",
    "Robert Morris Colonials": "Robert Morris",
    "Kent State Golden Flashes": "Kent State",
    "Merrimack Warriors": "Merrimack",
    "Duquesne Dukes": "Duquesne",
    "Ball State Cardinals": "Ball State",
    "Florida Atlantic Owls": "Florida Atlantic",
    "Southern Miss Golden Eagles": "Southern Miss",
    "San José State Spartans": "San José State",
    "Central Michigan Chippewas": "Central Michigan",
    "Florida International Panthers": "FIU",
    "Wagner Seahawks": "Wagner",
    "Bethune-Cookman Wildcats": "Bethune-Cookman",
    "Western Illinois Leathernecks": "Western Illinois",
    "Charlotte 49ers": "Charlotte",
    "App State Mountaineers": "App State",
    "Kennesaw State Owls": "Kennesaw State",
    "Michigan State Spartans": "Michigan State",
    "Western Michigan Broncos": "Western Michigan",
    "Tarleton State Texans": "Tarleton State",
    "Stony Brook Seawolves": "Stony Brook",
    "Miami (OH) RedHawks": "Miami (OH)",
    "UAB Blazers": "UAB",
    "Alabama State Hornets": "Alabama State",
    "Stephen F. Austin Lumberjacks": "Stephen F. Austin",
    "Buffalo Bulls": "Buffalo",
    "UT Martin Skyhawks": "UT Martin",
    "Central Arkansas Bears": "Central Arkansas",
    "Akron Zips": "Akron",
    "Wyoming Cowboys": "Wyoming",
    "UL Monroe Warhawks": "ULM",
    "Saint Francis Red Flash": "Saint Francis",
    "Delaware Blue Hens": "Delaware",
    "Delaware State Hornets": "Delaware State",
    "East Carolina Pirates": "East Carolina",
    "Bowling Green Falcons": "Bowling Green",
    "Lafayette Leopards": "Lafayette",
    "Ohio Bobcats": "Ohio",
    "South Florida Bulls": "USF",
    "Alabama Crimson Tide": "Alabama",
    "Ohio State Buckeyes": "Ohio State",
    "Georgia Bulldogs": "Georgia",
    "Michigan Wolverines": "Michigan",
    "Clemson Tigers": "Clemson",
    "LSU Tigers": "LSU",
    "Texas Longhorns": "Texas",
    "Oklahoma Sooners": "Oklahoma",
    "Notre Dame Fighting Irish": "Notre Dame",
    "USC Trojans": "USC",
    "Florida State Seminoles": "Florida State",
    "Penn State Nittany Lions": "Penn State",
    "Oregon Ducks": "Oregon",
    "Florida Gators": "Florida",
    "Auburn Tigers": "Auburn",
    "Tennessee Volunteers": "Tennessee",
    "Texas A&M Aggies": "Texas A&M",
    "Miami Hurricanes": "Miami",
    "Washington Huskies": "Washington",
    "Wisconsin Badgers": "Wisconsin",
    "Cincinnati Bearcats": "Cincinnati",
    "UCF Knights": "UCF",
    "Houston Cougars": "Houston",
    "BYU Cougars": "BYU",
    "Boise State Broncos": "Boise State",
    "San Diego State Aztecs": "San Diego State",
    "Fresno State Bulldogs": "Fresno State",
    "Utah State Aggies": "Utah State",
    "Air Force Falcons": "Air Force",
    "Army Black Knights": "Army",
    "Navy Midshipmen": "Navy",
    "Tulane Green Wave": "Tulane",
    "Memphis Tigers": "Memphis",
    "SMU Mustangs": "SMU",
    "Tulsa Golden Hurricane": "Tulsa",
    "Coastal Carolina Chanticleers": "Coastal Carolina",
    "Louisiana Ragin' Cajuns": "Louisiana",
    "Liberty Flames": "Liberty",
    "Marshall Thundering Herd": "Marshall",
    "North Dakota State Bison": "North Dakota State",
    "South Dakota State Jackrabbits": "South Dakota State",
    "Montana State Bobcats": "Montana State",
    "James Madison Dukes": "James Madison",
    "Sam Houston Bearkats": "Sam Houston State",
    "Jacksonville State Gamecocks": "Jacksonville State",
    "Eastern Washington Eagles": "Eastern Washington",
    "Weber State Wildcats": "Weber State",
    "Villanova Wildcats": "Villanova",
    "Delaware Fightin' Blue Hens": "Delaware",
    "New Hampshire Wildcats": "New Hampshire",
    "Richmond Spiders": "Richmond",
    "William & Mary Tribe": "William & Mary",
    "Elon Phoenix": "Elon",
    "Arkansas Razorbacks": "Arkansas",
    "Mississippi State Bulldogs": "Mississippi State",
    "Ole Miss Rebels": "Ole Miss",
    "Missouri Tigers": "Missouri",
    "Kentucky Wildcats": "Kentucky",
    "South Carolina Gamecocks": "South Carolina",
    "Vanderbilt Commodores": "Vanderbilt",
    "Iowa Hawkeyes": "Iowa",
    "Minnesota Golden Gophers": "Minnesota",
    "Nebraska Cornhuskers": "Nebraska",
    "Northwestern Wildcats": "Northwestern",
    "Purdue Boilermakers": "Purdue",
    "Illinois Fighting Illini": "Illinois",
    "Indiana Hoosiers": "Indiana",
    "Maryland Terrapins": "Maryland",
    "Rutgers Scarlet Knights": "Rutgers",
    "California Golden Bears": "California",
    "Stanford Cardinal": "Stanford",
    "UCLA Bruins": "UCLA",
    "Arizona Wildcats": "Arizona",
    "Arizona State Sun Devils": "Arizona State",
    "Colorado Buffaloes": "Colorado",
    "Utah Utes": "Utah",
    "Washington State Cougars": "Washington State",
    "Oregon State Beavers": "Oregon State",
    "Baylor Bears": "Baylor",
    "Iowa State Cyclones": "Iowa State",
    "Kansas Jayhawks": "Kansas",
    "Kansas State Wildcats": "Kansas State",
    "Oklahoma State Cowboys": "Oklahoma State",
    "TCU Horned Frogs": "TCU",
    "Texas Tech Red Raiders": "Texas Tech",
    "West Virginia Mountaineers": "West Virginia",
    "Boston College Eagles": "Boston College",
    "Duke Blue Devils": "Duke",
    "Georgia Tech Yellow Jackets": "Georgia Tech",
    "Louisville Cardinals": "Louisville",
    "North Carolina Tar Heels": "North Carolina",
    "NC State Wolfpack": "NC State",
    "Pittsburgh Panthers": "Pittsburgh",
    "Syracuse Orange": "Syracuse",
    "Virginia Cavaliers": "Virginia",
    "Virginia Tech Hokies": "Virginia Tech",
    "Wake Forest Demon Deacons": "Wake Forest",
    "UNLV Rebels": "UNLV",
    "Hawai'i Rainbow Warriors": "Hawai'i",
    "Western Kentucky Hilltoppers": "Western Kentucky",
    "Idaho State Bengals": "Idaho State",
  };
  if (map[name]) return map[name];

  if (teamLogos[name]) return name;

  return name;
}

const TeamLogo = ({ teamName, size = 25 }) => {
  const normalizedName = normalizeTeamName(teamName);
  const logoUrl =
    teamLogos[normalizedName] ||
    "https://a.espncdn.com/i/teamlogos/ncaa/500/default-team-logo-500.png";

  return (
    <img
      src={logoUrl}
      alt={`${normalizedName} logo`}
      style={{
        width: size,
        height: size,
        marginRight: 10,
        verticalAlign: "middle",
      }}
      onError={(e) => {
        e.target.src =
          "https://a.espncdn.com/i/teamlogos/ncaa/500/default-team-logo-500.png";
      }}
    />
  );
};

// Function to determine current week in college football
function getCurrentWeekCFB() {
  const now = new Date();
  const week0Start = new Date("2025-08-23T00:00:00Z");

  // Week 0: August 23-24
  if (now >= week0Start && now < new Date("2025-08-23T00:00:00Z")) {
    return 0;
  }

  // Regular season starts August 30, 2025
  const seasonStart = new Date("2025-08-28T00:00:00Z");
  if (now < seasonStart) return 0;

  // Calculate week (each week is 7 days, starting from Week 1)
  const weekDiff =
    Math.floor((now - seasonStart) / (7 * 24 * 60 * 60 * 1000)) + 1;

  // Regular season weeks 1-15
  if (weekDiff >= 1 && weekDiff <= 15) return weekDiff;

  // Bowl season weeks 16-20
  if (weekDiff >= 16 && weekDiff <= 20) return weekDiff;

  // National championship week 21
  if (weekDiff >= 21) return 21;

  return 0;
}

const todayString = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

function CfbPage() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(2025);
  const [showPredictions, setShowPredictions] = useState(false);
  const [blink, setBlink] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [gamesDataCache, setGamesDataCache] = useState({});
  const [selectedConference, setSelectedConference] = useState("ALL");
  const [selectedDay, setSelectedDay] = useState("ALL");
  const [availableDays, setAvailableDays] = useState(["ALL"]);
  const [isTop25, setIsTop25] = useState(false);

  // Blinking dot effect for live games
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set current season and week on initial load
  useEffect(() => {
    if (initialLoad) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const season = 2025;
      setSelectedSeason(season);

      const week = season === getCurrentWeekCFB();
      setSelectedWeek(week);

      setInitialLoad(false);
    }
  }, [initialLoad]);

  // Update week when season changes
  useEffect(() => {
    if (!initialLoad) {
      // Reset to appropriate week when season changes
      const week = selectedSeason === 2025 ? getCurrentWeekCFB() : 1;
      setSelectedWeek(week);
      setShowPredictions(false);
    }
  }, [selectedSeason, initialLoad]);

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Update the useEffect that loads games to properly set available days
  useEffect(() => {
    const loadGames = async () => {
      setError(null);

      if (selectedSeason === 2025) {
        try {
          let allEvents = [];
          let daysInWeek = new Set(["ALL"]);

          if (selectedWeek === 0) {
            const week0Dates = ["20250823", "20250824"];

            const fetches = week0Dates.map((dateStr) =>
              fetch(
                `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=${dateStr}`,
              ).then((res) =>
                res.ok
                  ? res.json()
                  : Promise.reject(`Failed to fetch date ${dateStr}`),
              ),
            );

            const results = await Promise.all(fetches);
            results.forEach((data) => {
              if (data.events) {
                allEvents.push(...data.events);
                data.events.forEach((event) => {
                  if (event.date) {
                    const dayString = getDayFromDate(event.date);
                    daysInWeek.add(dayString);
                  }
                });
              }
            });
          }
          // College football weeks (1-21)
          else if (selectedWeek >= 1 && selectedWeek <= 21) {
            const seasonStart = new Date("2025-08-28T00:00:00Z");
            const weekStartDate = new Date(
              seasonStart.getTime() +
                (selectedWeek - 1) * 7 * 24 * 60 * 60 * 1000,
            );

            const datesToFetch = [];
            for (let i = 0; i < 7; i++) {
              const d = new Date(
                weekStartDate.getTime() + i * 24 * 60 * 60 * 1000,
              );
              const dateStr = `${d.getUTCFullYear()}${String(
                d.getUTCMonth() + 1,
              ).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
              datesToFetch.push(dateStr);
            }

            const fetches = datesToFetch.map((dateStr) =>
              fetch(
                `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=${dateStr}`,
              ).then((res) =>
                res.ok
                  ? res.json()
                  : Promise.reject(`Failed to fetch date ${dateStr}`),
              ),
            );

            const results = await Promise.all(fetches);
            results.forEach((data) => {
              if (data.events) {
                allEvents.push(...data.events);
                data.events.forEach((event) => {
                  if (event.date) {
                    const dayString = getDayFromDate(event.date);
                    daysInWeek.add(dayString);
                  }
                });
              }
            });
          }

          setAvailableDays(Array.from(daysInWeek));
          // Update games data cache
          setGamesDataCache((prev) => {
            const newCache = { ...prev };

            allEvents.forEach((event) => {
              const eventId = event.id;
              const competition = event.competitions?.[0];
              const currentOdds = competition?.odds?.[0];

              // Kickoff time from ESPN API
              const kickoff = new Date(event.date);
              const now = new Date();

              // If we are less than 1 hour before kickoff, lock odds (don’t overwrite)
              const isLocked =
                kickoff.getTime() - now.getTime() <= 60 * 60 * 1000;

              if (!isLocked) {
                // Only update cache while not locked
                if (
                  currentOdds &&
                  currentOdds.spread !== 0 &&
                  currentOdds.overUnder !== 0 &&
                  currentOdds.spread !== null &&
                  currentOdds.overUnder !== null
                ) {
                  // Store fresh pregame odds
                  newCache[eventId] = JSON.parse(JSON.stringify(event));
                }
              } else if (!newCache[eventId]) {
                // If locked but no cache yet, store once
                if (
                  currentOdds &&
                  currentOdds.spread !== 0 &&
                  currentOdds.overUnder !== 0
                ) {
                  newCache[eventId] = JSON.parse(JSON.stringify(event));
                }
              }
            });

            return newCache;
          });

          const uniqueEvents = Array.from(
            new Map(allEvents.map((event) => [event.id, event])).values(),
          );

          // Map to games
          const liveGames = uniqueEvents.map((event) => {
            const cachedEvent = gamesDataCache[event.id] || event;
            const competition = event.competitions[0];
            const cachedCompetition = cachedEvent.competitions[0];

            const homeTeamData = competition.competitors.find(
              (t) => t.homeAway === "home",
            );
            const awayTeamData = competition.competitors.find(
              (t) => t.homeAway === "away",
            );
            const home = normalizeTeamName(homeTeamData.team.displayName);
            const away = normalizeTeamName(awayTeamData.team.displayName);

            const gameTime = event.date ? new Date(event.date) : null;
            const dayInfo = gameTime ? getDayFromDate(event.date) : "TBD";

            const statusType = event.status.type.name;
            const isLive = statusType === "STATUS_IN_PROGRESS";
            const isFinal =
              statusType === "STATUS_FINAL" ||
              statusType === "STATUS_POSTPONED";

            // Get odds
            const liveOdds = competition.odds?.[0];
            const pregameOdds = cachedCompetition.odds?.[0];

            let odds;
            let oddsSource;

            const liveOddsInvalid =
              !liveOdds ||
              liveOdds.spread === 0 ||
              liveOdds.overUnder === 0 ||
              liveOdds.spread === null ||
              liveOdds.overUnder === null;

            const pregameOddsValid =
              pregameOdds &&
              pregameOdds.spread !== 0 &&
              pregameOdds.overUnder !== 0 &&
              pregameOdds.spread !== null &&
              pregameOdds.overUnder !== null;

            if (pregameOddsValid) {
              odds = pregameOdds;
              oddsSource = "pregame";
            } else if (!liveOddsInvalid) {
              odds = liveOdds;
              oddsSource = "live";
            } else {
              odds = { spread: 0, overUnder: 0, details: "" };
              oddsSource = "default";
            }

            // Normalize spread
            let spread = 0;
            if (
              odds.details &&
              odds.spread !== null &&
              odds.spread !== undefined &&
              odds.spread !== 0
            ) {
              const rawSpread = parseFloat(odds.spread);
              const absSpread = Math.abs(rawSpread);
              const favoredTeam = odds.details.toLowerCase();
              const awayLower = away.toLowerCase();
              const homeLower = home.toLowerCase();

              spread = favoredTeam.includes(awayLower)
                ? absSpread
                : favoredTeam.includes(homeLower)
                  ? -absSpread
                  : rawSpread;
            }

            const homeScore = parseInt(homeTeamData.score || "0");
            const awayScore = parseInt(awayTeamData.score || "0");

            // Calculate actual spread and total for finished games
            let actualSpread = null;
            let actualTotal = null;
            let outcome = null;

            if (isFinal && homeScore !== null && awayScore !== null) {
              actualSpread = awayScore - homeScore;
              actualTotal = awayScore + homeScore;

              if (homeScore > awayScore) {
                outcome = `${home} Win`;
              } else if (awayScore > homeScore) {
                outcome = `${away} Win`;
              } else {
                outcome = "Draw";
              }
            }

            return {
              id: event.id,
              Game: `${away} @ ${home}`,
              Spread: spread,
              Total: parseFloat(odds.overUnder || 0),
              isLive,
              isFinal,
              homeScore,
              awayScore,
              gameTime,
              day: dayInfo,
              fullDate: gameTime ? gameTime.toLocaleDateString() : "TBD",
              sortableTime: gameTime ? gameTime.getTime() : 0,
              ActualSpread: actualSpread,
              ActualTotal: actualTotal,
              Outcome: outcome,
              oddsSource,
              oddsDetails: odds.details || "",
              conferences: [
                teamConferences[away] || "FCS",
                teamConferences[home] || "FCS",
              ],
            };
          });

          setGames(liveGames);
        } catch (err) {
          console.error("Failed to fetch live games:", err);
          setError("Could not load live games for 2025");
          setGames([]);
        }
      }
    };

    loadGames();
  }, [selectedWeek, selectedSeason, gamesDataCache]);

  // Fix the day filtering in the useEffect that filters games
  useEffect(() => {
    let filtered = games;

    // Conference filter
    if (selectedConference !== "ALL") {
      if (selectedConference === "TOP25") {
        filtered = filtered.filter((game) => {
          const [away, home] = game.Game.split(" @ ");
          return TOP_25_TEAMS.has(away) || TOP_25_TEAMS.has(home);
        });
      } else if (selectedConference === "FBS") {
        filtered = filtered.filter((game) => {
          const [away, home] = game.Game.split(" @ ");
          return teamConferences[away] && teamConferences[home];
        });
      } else if (selectedConference === "FCS") {
        filtered = filtered.filter((game) => {
          const [away, home] = game.Game.split(" @ ");
          return !teamConferences[away] || !teamConferences[home];
        });
      } else {
        filtered = filtered.filter((game) => {
          const [away, home] = game.Game.split(" @ ");
          return (
            teamConferences[away] === selectedConference ||
            teamConferences[home] === selectedConference
          );
        });
      }
    }

    // ✅ ONLY filter by day if NOT ALL
    if (selectedDay !== "ALL") {
      filtered = filtered.filter((game) => game.day === selectedDay);
    }

    // Top 25 toggle
    if (isTop25) {
      filtered = filtered.filter((game) => {
        const [away, home] = game.Game.split(" @ ");
        return TOP_25_TEAMS.has(away) || TOP_25_TEAMS.has(home);
      });
    }

    setFilteredGames(filtered);
  }, [games, selectedConference, selectedDay, isTop25]);

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (a.isFinal && !b.isFinal) return 1;
    if (!a.isFinal && b.isFinal) return -1;
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return new Date(a.gameTime) - new Date(b.gameTime);
  });

  const LiveDot = () => (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        marginRight: 6,
        backgroundColor: "red",
        borderRadius: "50%",
        opacity: blink ? 1 : 0.3,
        transition: "opacity 0.5s ease-in-out",
      }}
    />
  );

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          week: selectedWeek,
          season: selectedSeason,
          games: filteredGames,
        }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

      const data = await response.json();
      setPredictions(data.predictions || []);
      setShowPredictions(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>College Football Spread Predictions</h1>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="selectors">
        <label>Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => {
            setSelectedSeason(parseInt(e.target.value));
          }}
        >
          <option value={2025}>2025</option>
        </select>

        <label>Week:</label>
        <select
          value={selectedWeek}
          onChange={(e) => {
            setSelectedWeek(parseInt(e.target.value));
            setSelectedDay("ALL"); // auto show entire week
            setShowPredictions(false);
          }}
        >
          {availableWeeks2025.map((week) => (
            <option key={week} value={week}>
              {weekLabel(week, selectedSeason)}
            </option>
          ))}
        </select>

        <label>Conference:</label>
        <select
          value={selectedConference}
          onChange={(e) => setSelectedConference(e.target.value)}
        >
          {Object.entries(CONFERENCES).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Fetching Predictions..." : "Get Predictions"}
        </button>
      </div>

      <h2>Game Data</h2>

      <div className="day-buttons">
        {availableDays
          .sort((a, b) => {
            if (a === "ALL") return -1;
            if (b === "ALL") return 1;

            const dateA = new Date(
              a.replace(/([a-zA-Z]{3}) ([a-zA-Z]{3}) (\d{1,2})/, "$2 $3, 2025"),
            );

            const dateB = new Date(
              b.replace(/([a-zA-Z]{3}) ([a-zA-Z]{3}) (\d{1,2})/, "$2 $3, 2025"),
            );

            return dateA - dateB;
          })
          .map((day) => (
            <button
              key={day}
              className={selectedDay === day ? "active" : ""}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Game</th>
            <th>Spread</th>
            <th>Total</th>
            <th>Score</th>
            {selectedSeason === 2025 && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {sortedGames.length > 0 ? (
            sortedGames.map((game, idx) => {
              const [awayTeam, homeTeam] = game.Game.split(" @ ");
              const gameTime = game.gameTime
                ? game.gameTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "TBD";
              return (
                <tr key={idx}>
                  <td>{gameTime}</td>
                  <td>
                    <TeamLogo teamName={awayTeam} size={25} />
                    <span className="team-name">{awayTeam}</span>
                    {" @ "}
                    <TeamLogo teamName={homeTeam} size={25} />
                    <span className="team-name">{homeTeam}</span>
                  </td>
                  <td>{game.Spread?.toFixed(1)}</td>
                  <td>{game.Total?.toFixed(1)}</td>
                  <td>
                    {game.awayScore !== null && game.homeScore !== null
                      ? `${game.awayScore} - ${game.homeScore}`
                      : "N/A"}
                  </td>
                  {selectedSeason === 2025 && (
                    <td>
                      {game.isLive && (
                        <>
                          <LiveDot /> LIVE
                        </>
                      )}
                      {game.isFinal && "FINAL"}
                      {!game.isLive && !game.isFinal && "UPCOMING"}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={selectedSeason === 2025 ? 6 : 5}>
                No games available for this week.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showPredictions && predictions.length > 0 && (
        <>
          <h2>Predictions</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Spread</th>
                <th>Total</th>
                <th>Predicted Spread</th>
                <th>Predicted Outcome</th>
                <th>Actual Spread</th>
                <th>Actual Total</th>
                <th>Final Score</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, idx) => {
                const [awayTeam, homeTeam] = pred.game.split(" @ ");
                const game = games.find((g) => g.Game === pred.game);
                const finalScore =
                  game && game.homeScore !== null && game.awayScore !== null
                    ? `${game.awayScore} - ${game.homeScore}`
                    : "N/A";

                return (
                  <tr key={idx}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <TeamLogo teamName={awayTeam} size={20} />
                      <span className="team-name">{awayTeam}</span>
                      {" @ "}
                      <TeamLogo teamName={homeTeam} size={20} />
                      <span className="team-name">{homeTeam}</span>
                    </td>
                    <td>{pred.spread?.toFixed(1)}</td>
                    <td>{pred.total?.toFixed(1)}</td>
                    <td>{pred.predicted_spread?.toFixed(2)}</td>
                    <td>{pred.predicted_outcome}</td>
                    <td>
                      {game?.ActualSpread !== null
                        ? game.ActualSpread.toFixed(1)
                        : "N/A"}
                    </td>
                    <td>
                      {game?.ActualTotal !== null
                        ? game.ActualTotal.toFixed(1)
                        : "N/A"}
                    </td>
                    <td>{finalScore}</td>
                    <td>{game?.Outcome || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default CfbPage;

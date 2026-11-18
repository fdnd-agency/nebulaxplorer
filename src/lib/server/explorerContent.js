import { componentViews } from './componentViews.js'

export const explorerContent = {
	id: 'satellite',
	scene: 'satellite',
	shortLabel: {
		en: 'Satellite',
		nl: 'Satelliet',
	},
	kicker: {
		en: 'Spacecraft',
		nl: 'Ruimtevaartuig',
	},
	title: {
		en: 'NEBULA Xplorer satellite',
		nl: 'NEBULA Xplorer-satelliet',
	},
	lead: {
		en: 'Explore the NEBULA Xplorer satellite in 3D. Rotate the spacecraft, zoom in, and select a component to discover where it is located and what it does.',
		nl: 'Verken de NEBULA Xplorer-satelliet in 3D. Draai het ruimtevaartuig, zoom in en selecteer een onderdeel om te ontdekken waar het zich bevindt en wat het doet.',
		// Shown when there is no 3D model to rotate or select in: what the
		// spacecraft is, in one plain sentence (from the mission text and the
		// X-ray instrument)
		withoutScript: {
			en: 'NEBULA Xplorer is a student-driven satellite mission with an X-ray instrument on board.',
			nl: 'NEBULA Xplorer is een studentenmissie: een satelliet met een röntgeninstrument aan boord.',
		},
	},
	// Without JavaScript: a slow, looping sway rendered from the 3D model,
	// starting on the still (scripts/render-stills.mjs). Phones get an
	// upright composition with both panel tips in frame.
	hero: {
		still: '/media/hero/satellite',
		animation: '/media/hero/satellite-turn.avif',
		width: 1080,
		height: 1080,
		tall: {
			still: '/media/hero/satellite-tall',
			animation: '/media/hero/satellite-tall-turn.avif',
			width: 900,
			height: 1200,
		},
		alt: {
			en: 'Rendering of the NEBULA Xplorer satellite from the CAD model: a box-shaped spacecraft with two deployed solar panels and the X-ray instrument apertures on its front.',
			nl: 'Weergave van de NEBULA Xplorer-satelliet uit het CAD-model: een kastvormig ruimtevaartuig met twee uitgeklapte zonnepanelen en de openingen van het röntgeninstrument aan de voorkant.',
		},
	},
	staticNote: {
		en: 'The interactive 3D model needs JavaScript. All satellite information is on this page.',
		nl: 'Het interactieve 3D-model heeft JavaScript nodig. Alle informatie over de satelliet staat op deze pagina.',
	},
	// {count} is the number of main components
	exploreComponents: {
		en: 'Explore {count} components',
		nl: 'Verken {count} onderdelen',
	},
	componentsLabel: {
		en: 'Components',
		nl: 'Onderdelen',
	},
	children: [
		{
			id: 'x-ray-instrument',
			// Earlier anchors that still lead here
			aliases: ['xray-instrument'],
			image: {
				name: 'x-ray-instrument',
				alt: {
					en: 'CAD render of the X-ray instrument assembly with its concentrator sunshields, frame and electronics module.',
					nl: 'CAD-weergave van het röntgeninstrument met de zonneschermen van de concentrators, het frame en de elektronicamodule.',
				},
			},
			scene: 'satellite-component',
			title: {
				en: 'X-Ray Instrument',
				nl: 'Röntgeninstrument',
			},
			blocks: [
				{
					kind: 'about',
					paragraphs: [
						{
							en: "Sending a telescope to space means engineering for the impossible: it has to survive a rocket launch, then operate flawlessly in a vacuum where temperatures swing by hundreds of degrees. NEBULA-Xplorer's X-ray instrument is suspended on three precision titanium mounts that isolate it from shock and temperature change, anchored to a reinforced panel, and oriented to use every centimeter of space inside the rocket fairing.",
							nl: 'Een telescoop de ruimte in sturen betekent ontwerpen voor het onmogelijke: hij moet een raketlancering overleven en vervolgens feilloos functioneren in een vacuüm waarin temperaturen honderden graden schommelen. Het röntgeninstrument van NEBULA-Xplorer hangt aan drie precieze titanium bevestigingen die het isoleren van schokken en temperatuurveranderingen, is verankerd aan een versterkt paneel en zo georiënteerd dat elke centimeter ruimte in de raketneuskegel wordt benut.',
						},
					],
				},
			],
			children: [
				{
					id: 'instrument-components',
					image: {
						name: 'instrument-components',
						alt: {
							en: 'CAD render of the inside of the X-ray instrument with the outer panels hidden.',
							nl: 'CAD-weergave van de binnenkant van het röntgeninstrument, zonder buitenpanelen.',
						},
					},
					scene: 'instrument',
					title: {
						en: 'Instrument components',
						nl: 'Instrumentonderdelen',
					},
					blocks: [
						{
							kind: 'lead',
							text: {
								en: 'Select a part to see where it sits inside the X-ray instrument. The outer panels are hidden so you can look inside.',
								withoutScript: {
									en: 'The parts inside the X-ray instrument, shown with the outer panels hidden.',
									nl: 'De onderdelen in het röntgeninstrument, getoond zonder de buitenpanelen.',
								},
								nl: 'Selecteer een onderdeel om te zien waar het in het röntgeninstrument zit. De buitenpanelen zijn verborgen, zodat je naar binnen kunt kijken.',
							},
						},
					],
					children: [
						{
							id: 'instrument-detectors',
							image: {
								name: 'instrument-detectors',
								alt: {
									en: 'CAD render of the detector modules.',
									nl: 'CAD-weergave van de detectormodules.',
								},
							},
							scene: 'instrument-component',
							title: {
								en: 'Detector modules',
								nl: 'Detectormodules',
							},
							blocks: [
								{
									kind: 'about',
									paragraphs: [
										{
											en: 'The sensors turn arriving X-rays into electrical signals. The FPM and FPCM modules in this model contain the sensors and their immediate mechanical and thermal parts.',
											nl: 'De sensoren zetten binnenkomende röntgenstraling om in elektrische signalen. De FPM- en FPCM-modules in dit model bevatten de sensoren en hun directe mechanische en thermische onderdelen.',
										},
									],
								},
							],
							children: [],
							component: 'detectors',
						},
						{
							id: 'instrument-baffles',
							image: {
								name: 'instrument-baffles',
								alt: {
									en: 'CAD render of the science baffles.',
									nl: 'CAD-weergave van de science baffles.',
								},
							},
							scene: 'instrument-component',
							title: {
								en: 'Baffles',
								nl: 'Afschermbuizen',
							},
							blocks: [
								{
									kind: 'about',
									paragraphs: [
										{
											en: "These tubes restrict the detectors' field of view and help block unwanted radiation arriving from the side. They are named Science baffle in the CAD model.",
											nl: 'Deze buizen beperken het zicht van de detectoren en helpen ongewenste straling van opzij tegen te houden. In het CAD-model heten ze Science baffle.',
										},
									],
								},
							],
							children: [],
							component: 'baffles',
						},
						{
							id: 'instrument-electronics',
							image: {
								name: 'instrument-electronics',
								alt: {
									en: 'CAD render of the readout electronics.',
									nl: 'CAD-weergave van de uitleeselektronica.',
								},
							},
							scene: 'instrument-component',
							title: {
								en: 'Readout electronics',
								nl: 'Uitleeselektronica',
							},
							blocks: [
								{
									kind: 'about',
									paragraphs: [
										{
											en: "The preamplifiers process the sensors' small electrical signals for further readout. This group includes the PA210 preamplifiers, PA-230 connections and their housings.",
											nl: 'De voorversterkers verwerken de kleine elektrische signalen van de sensoren voor verdere uitlezing. Deze groep bevat de PA210-voorversterkers, PA-230-aansluitingen en hun behuizingen.',
										},
									],
								},
							],
							children: [],
							component: 'electronics',
						},
						{
							id: 'instrument-calibration',
							image: {
								name: 'instrument-calibration',
								alt: {
									en: 'CAD render of the calibration tubes.',
									nl: 'CAD-weergave van de kalibratiebuizen.',
								},
							},
							scene: 'instrument-component',
							title: {
								en: 'Calibration',
								nl: 'Kalibratie',
							},
							blocks: [
								{
									kind: 'about',
									paragraphs: [
										{
											en: "The calibration parts help check the detector's response using a reference source. Here you can explore the calibration tubes and associated parts of the FPCM modules.",
											nl: 'De kalibratieonderdelen helpen de respons van de detector te controleren met een referentiebron. Hier zie je de kalibratiebuizen en bijbehorende onderdelen van de FPCM-modules.',
										},
									],
								},
							],
							children: [],
							component: 'calibration',
						},
						{
							id: 'instrument-structure',
							image: {
								name: 'instrument-structure',
								alt: {
									en: 'CAD render of the optical bench and frame parts of the instrument.',
									nl: 'CAD-weergave van de optische bank en de frameonderdelen van het instrument.',
								},
							},
							scene: 'instrument-component',
							title: {
								en: 'Optical bench and frame',
								nl: 'Optische bank en frame',
							},
							blocks: [
								{
									kind: 'about',
									paragraphs: [
										{
											en: "The optical bench, ribs and side panels form the instrument's supporting structure. In the inside view the exterior panels are hidden so you can inspect the parts within.",
											nl: 'De optische bank, ribben en zijpanelen vormen de draagstructuur van het instrument. In de open weergave zijn de buitenpanelen verborgen, zodat je de onderdelen binnenin kunt bekijken.',
										},
									],
								},
							],
							children: [],
							component: 'structure',
						},
						{
							id: 'instrument-mounts',
							image: {
								name: 'instrument-mounts',
								alt: {
									en: 'CAD render of the rods, feet and fittings that hold the instrument.',
									nl: 'CAD-weergave van de stangen, voeten en bevestigingsstukken die het instrument dragen.',
								},
							},
							scene: 'instrument-component',
							title: {
								en: 'Mounts',
								nl: 'Bevestigingen',
							},
							blocks: [
								{
									kind: 'about',
									paragraphs: [
										{
											en: 'The rods, feet and fittings connect the instrument to its supporting assembly. Select them to see where these mechanical connections sit.',
											withoutScript: {
												en: 'The rods, feet and fittings connect the instrument to its supporting assembly.',
												nl: 'De stangen, voeten en bevestigingsstukken verbinden het instrument met zijn draagconstructie.',
											},
											nl: 'De stangen, voeten en bevestigingsstukken verbinden het instrument met zijn draagconstructie. Klik om te zien waar deze mechanische verbindingen zitten.',
										},
									],
								},
							],
							children: [],
							component: 'mounts',
						},
						{
							id: 'instrument-support',
							image: {
								name: 'instrument-support',
								alt: {
									en: 'CAD render of the sandwich support panel.',
									nl: 'CAD-weergave van het sandwich-draagpaneel.',
								},
							},
							scene: 'instrument-component',
							title: {
								en: 'Support panel',
								nl: 'Draagpaneel',
							},
							blocks: [
								{
									kind: 'about',
									paragraphs: [
										{
											en: 'The large sandwich panel behind the instrument provides the mechanical base for its mounts. Orbit around it to inspect its connections to the frame.',
											withoutScript: {
												en: 'The large sandwich panel behind the instrument provides the mechanical base for its mounts.',
												nl: 'Het grote sandwichpaneel achter het instrument vormt de mechanische basis voor de bevestigingen.',
											},
											nl: 'Het grote sandwichpaneel achter het instrument vormt de mechanische basis voor de bevestigingen. Je kunt eromheen draaien om de verbindingen met het frame te bekijken.',
										},
									],
								},
							],
							children: [],
							component: 'support',
						},
					],
				},
				{
					id: 'optics',
					scene: 'optics',
					title: {
						en: 'Optics',
						nl: 'Optica',
					},
					blocks: [
						{
							kind: 'lead',
							text: {
								en: 'Two ways to look at the X-ray optics: an illustrative schematic of the radiation path and the supplied CAD parts.',
								nl: 'Twee manieren om de röntgenoptiek te bekijken: een illustratief schema van de stralingsweg en de aangeleverde CAD-onderdelen.',
							},
						},
					],
					children: [
						{
							id: 'optical-path',
							image: {
								name: 'optical-path',
								schematic: true,
								alt: {
									en: 'Schematic of the X-ray path: incoming rays reflect off the primary and secondary mirror and converge on the detector. Dimensions and angles are illustrative.',
									nl: 'Schema van het röntgenpad: inkomende stralen weerkaatsen op de primaire en secundaire spiegel en komen samen op de detector. Afmetingen en hoeken zijn illustratief.',
								},
							},
							scene: 'optical-path',
							title: {
								en: 'Mirror and X-ray path',
								nl: 'Spiegel en röntgenpad',
							},
							blocks: [
								{
									kind: 'lead',
									text: {
										en: 'Parallel X-rays reflect twice at shallow angles: first on the primary mirror, then on the secondary mirror. They converge on the detector. A tube helps block stray light.',
										nl: 'Parallelle röntgenstralen reflecteren twee keer onder een kleine hoek: eerst op de primaire spiegel, daarna op de secundaire spiegel. Ze komen samen op de detector. Een buis helpt strooilicht tegen te houden.',
									},
								},
								{
									kind: 'note',
									text: {
										en: 'Schematic cutaway; dimensions and angles are illustrative. Yellow lines represent the radiation path, not visible light.',
										nl: 'Schematische doorsnede; afmetingen en hoeken zijn illustratief. De gele lijnen tonen de stralingsweg, niet zichtbaar licht.',
									},
								},
							],
							children: [
								{
									id: 'optical-primary',
									image: {
										name: 'cad-primary',
										alt: {
											en: 'CAD model of the primary concentrator structure.',
											nl: 'CAD-model van de primaire concentratorstructuur.',
										},
									},
									scene: 'optical-component',
									title: {
										en: 'Primary mirror',
										nl: 'Primaire spiegel',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The first shallow-angle reflection redirects incoming X-rays toward the secondary mirror.',
													nl: 'De eerste reflectie onder een kleine hoek stuurt binnenkomende röntgenstraling naar de secundaire spiegel.',
												},
											],
										},
									],
									children: [],
									component: 'primary',
								},
								{
									id: 'optical-secondary',
									image: {
										name: 'cad-secondary',
										alt: {
											en: 'CAD model of the secondary concentrator structure.',
											nl: 'CAD-model van de secundaire concentratorstructuur.',
										},
									},
									scene: 'optical-component',
									title: {
										en: 'Secondary mirror',
										nl: 'Secundaire spiegel',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The second reflection directs the X-rays toward the focal plane.',
													nl: 'De tweede reflectie stuurt de röntgenstraling naar het brandvlak.',
												},
											],
										},
									],
									children: [],
									component: 'secondary',
								},
								{
									id: 'optical-tube',
									scene: 'optical-component',
									title: {
										en: 'Stray-light tube',
										nl: 'Strooilichtbuis',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'This tube helps block light entering from the side before the X-rays reach the detector.',
													nl: 'Deze buis helpt licht dat van opzij binnenkomt tegen te houden voordat de röntgenstraling de detector bereikt.',
												},
											],
										},
									],
									children: [],
									component: 'tube',
								},
								{
									id: 'optical-fpm',
									image: {
										name: 'cad-fpm',
										alt: {
											en: 'CAD model of the Focal Plane Module (FPM).',
											nl: 'CAD-model van de Focal Plane Module (FPM).',
										},
									},
									scene: 'optical-component',
									title: {
										en: 'FPM / detector',
										nl: 'FPM / detector',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The focal-plane module contains the detector at the focused X-ray position.',
													nl: 'De focal-plane module bevat de detector op de plek waar de röntgenstraling wordt gefocust.',
												},
											],
										},
									],
									children: [],
									component: 'fpm',
								},
								{
									id: 'optical-fpcm',
									image: {
										name: 'cad-fpcm',
										alt: {
											en: 'CAD model of the Focal Plane Calibration Module (FPCM).',
											nl: 'CAD-model van de Focal Plane Calibration Module (FPCM).',
										},
									},
									scene: 'optical-component',
									title: {
										en: 'FPCM / camera module',
										nl: 'FPCM / cameramodule',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The focal-plane camera module supports the detector assembly. The schematic shows an illustrative housing; the individual CAD parts show the supplied CAD model.',
													nl: 'De focal-plane cameramodule ondersteunt de detectoreenheid. Het schema toont een illustratieve behuizing; bij de losse CAD-onderdelen zie je het aangeleverde CAD-model.',
												},
											],
										},
									],
									children: [],
									component: 'fpcm',
								},
								{
									id: 'optical-rays',
									scene: 'optical-component',
									title: {
										en: 'X-ray path',
										nl: 'Röntgenpad',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'Yellow lines illustrate incoming rays, two reflections and the focal plane. This is a schematic, not visible light.',
													nl: 'Gele lijnen tonen binnenkomende stralen, twee reflecties en het brandvlak. Dit is een schema, geen zichtbaar licht.',
												},
											],
										},
									],
									children: [],
									component: 'rays',
								},
							],
						},
						{
							id: 'cad-parts',
							scene: 'cad-parts',
							title: {
								en: 'Individual CAD parts',
								nl: 'Losse CAD-onderdelen',
							},
							blocks: [
								{
									kind: 'lead',
									text: {
										en: 'CAD parts are shown individually with source colors. The supplied concentrator files describe the June 2026 test configuration; mandrels are manufacturing tools.',
										nl: 'CAD-onderdelen worden afzonderlijk getoond, met hun bronkleuren. De aangeleverde concentratorbestanden beschrijven de testconfiguratie van juni 2026; mandrels zijn productiegereedschap.',
									},
								},
							],
							children: [
								{
									id: 'cad-primary',
									image: {
										name: 'cad-primary',
										alt: {
											en: 'CAD model of the primary concentrator structure.',
											nl: 'CAD-model van de primaire concentratorstructuur.',
										},
									},
									scene: 'cad-part',
									title: {
										en: 'Primary mirror',
										nl: 'Primaire spiegel',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The supplied CAD model of the primary concentrator structure, shown with its source colors.',
													nl: 'Het aangeleverde CAD-model van de primaire concentratorstructuur, getoond met de bronkleuren.',
												},
											],
										},
									],
									children: [],
									component: 'primary',
								},
								{
									id: 'cad-secondary',
									image: {
										name: 'cad-secondary',
										alt: {
											en: 'CAD model of the secondary concentrator structure.',
											nl: 'CAD-model van de secundaire concentratorstructuur.',
										},
									},
									scene: 'cad-part',
									title: {
										en: 'Secondary mirror',
										nl: 'Secundaire spiegel',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The supplied CAD model of the secondary concentrator structure, shown with its source colors.',
													nl: 'Het aangeleverde CAD-model van de secundaire concentratorstructuur, getoond met de bronkleuren.',
												},
											],
										},
									],
									children: [],
									component: 'secondary',
								},
								{
									id: 'cad-fpm',
									image: {
										name: 'cad-fpm',
										alt: {
											en: 'CAD model of the Focal Plane Module (FPM).',
											nl: 'CAD-model van de Focal Plane Module (FPM).',
										},
									},
									scene: 'cad-part',
									title: {
										en: 'FPM / detector',
										nl: 'FPM / detector',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The supplied CAD model of the Focal Plane Module (FPM), shown with its source colors.',
													nl: 'Het aangeleverde CAD-model van de Focal Plane Module (FPM), getoond met de bronkleuren.',
												},
											],
										},
									],
									children: [],
									component: 'fpm',
								},
								{
									id: 'cad-fpcm',
									image: {
										name: 'cad-fpcm',
										alt: {
											en: 'CAD model of the Focal Plane Calibration Module (FPCM).',
											nl: 'CAD-model van de Focal Plane Calibration Module (FPCM).',
										},
									},
									scene: 'cad-part',
									title: {
										en: 'FPCM / camera module',
										nl: 'FPCM / cameramodule',
									},
									blocks: [
										{
											kind: 'about',
											paragraphs: [
												{
													en: 'The supplied CAD model of the Focal Plane Calibration Module (FPCM), shown with its source colors.',
													nl: 'Het aangeleverde CAD-model van de Focal Plane Calibration Module (FPCM), getoond met de bronkleuren.',
												},
											],
										},
									],
									children: [],
									component: 'fpcm',
								},
							],
						},
					],
				},
			],
			component: 'xrayInstrument',
		},
		{
			id: 'star-tracker',
			aliases: ['star-tracker-module'],
			image: {
				name: 'star-tracker',
				alt: {
					en: 'CAD render of the star tracker module: two star tracker cameras on their mounting bracket.',
					nl: 'CAD-weergave van de stertracker-module: twee sterrencamera’s op hun montagebeugel.',
				},
			},
			scene: 'satellite-component',
			title: {
				en: 'Star Tracker Module',
				nl: 'Stertracker-module',
			},
			blocks: [
				{
					kind: 'about',
					paragraphs: [
						{
							en: "To observe a faint X-ray source hundreds of light-years away, NEBULA-Xplorer needs to hold its aim with extraordinary precision. Star trackers continuously scan the sky, recognize patterns of stars, and determine the spacecraft's orientation down to a few arcseconds. Two units ensure constant visibility of stars even during rotation.",
							nl: 'Om een zwakke röntgenbron op honderden lichtjaren afstand waar te nemen, moet NEBULA-Xplorer zijn richting met buitengewone precisie vasthouden. Stertrackers scannen voortdurend de hemel, herkennen sterpatronen en bepalen de oriëntatie van het ruimtevaartuig tot op enkele boogseconden nauwkeurig. Twee units garanderen constant zicht op sterren, ook tijdens rotatie.',
						},
					],
				},
			],
			children: [],
			component: 'starTrackerModule',
		},
		{
			id: 'dawn-4u-cubedrive',
			image: {
				name: 'dawn-4u-cubedrive',
				alt: {
					en: 'CAD render of the Dawn 4U CubeDrive propulsion module with its thrusters.',
					nl: 'CAD-weergave van de Dawn 4U CubeDrive-voortstuwingsmodule met de stuwmotoren.',
				},
			},
			scene: 'satellite-component',
			title: {
				en: 'Dawn 4U CubeDrive',
				nl: 'Dawn 4U CubeDrive',
			},
			blocks: [
				{
					kind: 'about',
					paragraphs: [
						{
							en: 'The propulsion system counters atmospheric drag, performs collision avoidance, and enables controlled reentry. This compact thruster unit carries under two kilograms of propellant and is precisely aligned to ensure stable, accurate maneuvers throughout the mission.',
							nl: 'Het voortstuwingssysteem compenseert atmosferische weerstand, voert uitwijkmanoeuvres uit en maakt gecontroleerde terugkeer in de atmosfeer mogelijk. Deze compacte thrusterunit bevat minder dan twee kilogram drijfgas en is nauwkeurig uitgelijnd voor stabiele, precieze manoeuvres tijdens de missie.',
						},
					],
				},
			],
			children: [],
			component: 'dawn4UCubeDrive',
		},
		{
			id: 's-band-antenna',
			image: {
				name: 's-band-antenna',
				alt: {
					en: 'CAD render of the S-band quad patch antenna and one of the patch antennas.',
					nl: 'CAD-weergave van de S-band quad-patchantenne en een van de patchantennes.',
				},
			},
			scene: 'satellite-component',
			title: {
				en: 'S-Band Antenna',
				nl: 'S-bandantenne',
			},
			blocks: [
				{
					kind: 'about',
					paragraphs: [
						{
							en: 'The S-band antenna enables communication with Earth during brief contact windows. It transmits gigabytes of scientific data over large distances in minutes, ensuring valuable observations reach ground stations.',
							nl: 'De S-bandantenne maakt communicatie met de aarde mogelijk tijdens korte contactvensters. Hij verzendt in enkele minuten gigabytes aan wetenschappelijke data over grote afstanden, zodat waardevolle waarnemingen grondstations bereiken.',
						},
					],
				},
			],
			children: [],
			component: 'sBandAntenna',
		},
		{
			id: 'sun-sensor',
			image: {
				name: 'sun-sensor',
				alt: {
					en: 'CAD render of one of the four Bison64 sun sensors, seen from the front.',
					nl: 'CAD-weergave van een van de vier Bison64-zonnesensoren, van voren gezien.',
				},
			},
			scene: 'satellite-component',
			title: {
				en: 'Sun Sensor',
				nl: 'Zonnesensor',
			},
			blocks: [
				{
					kind: 'about',
					paragraphs: [
						{
							en: "Sun sensors provide basic orientation by detecting the Sun's position. They are crucial during emergencies or initial deployment, helping the spacecraft maintain power and avoid dangerous pointing scenarios.",
							nl: 'Zonnesensoren geven een basisoriëntatie door de positie van de zon te detecteren. Ze zijn cruciaal tijdens noodgevallen of de eerste inzet en helpen het ruimtevaartuig vermogen te behouden en gevaarlijke oriëntaties te voorkomen.',
						},
						{
							en: 'This close-up shows one of the four Bison64 sun sensors. All four sensors are highlighted.',
							nl: 'Je ziet één van de vier Bison64-zonnesensoren van dichtbij. Alle vier de sensoren zijn gemarkeerd.',
						},
					],
				},
			],
			children: [],
			component: 'sunSensor',
		},
		{
			id: 'magnetorquers',
			image: {
				name: 'magnetorquers',
				alt: {
					en: 'CAD render of the three magnetorquer rods.',
					nl: 'CAD-weergave van de drie magnetorquer-staven.',
				},
			},
			scene: 'satellite-component',
			title: {
				en: 'Magnetorquers',
				nl: 'Magnetorquers',
			},
			blocks: [
				{
					kind: 'about',
					paragraphs: [
						{
							en: "These external devices generate magnetic torque to control the satellite's orientation and desaturate reaction wheels. By interacting with Earth's magnetic field, they provide efficient three-axis attitude control without the complexity of thrusters.",
							nl: 'Deze externe apparaten genereren magnetisch koppel om de oriëntatie van de satelliet te regelen en reactiewielen te ontladen. Door samen te werken met het magnetische veld van de aarde bieden ze efficiënte drieassige standregeling zonder de complexiteit van thrusters.',
						},
					],
				},
			],
			children: [],
			component: 'magnetorquers',
		},
		{
			id: 'solar-panel',
			image: {
				name: 'solar-panel',
				alt: {
					en: 'CAD render of one deployed solar panel with its mounting.',
					nl: 'CAD-weergave van een uitgeklapt zonnepaneel met de bevestiging.',
				},
			},
			scene: 'satellite-component',
			title: {
				en: 'Solar Panel',
				nl: 'Zonnepaneel',
			},
			blocks: [
				{
					kind: 'about',
					paragraphs: [
						{
							en: "These panels convert sunlight into electricity to power the satellite's systems and instruments. Positioned to capture maximum sunlight, they support continuous operation when combined with onboard energy storage during eclipse.",
							nl: 'Deze panelen zetten zonlicht om in elektriciteit om de systemen en instrumenten van de satelliet van stroom te voorzien. Ze zijn geplaatst om maximaal zonlicht op te vangen en ondersteunen continue werking samen met energieopslag aan boord tijdens een eclips.',
						},
					],
				},
			],
			children: [],
			component: 'solarPanel',
		},
	],
	mission: {
		title: {
			en: 'About the mission',
			nl: 'Over de missie',
		},
		text: {
			en: 'This student-driven mission combines innovation with academic and industry expertise. Its high time resolution and continuous observations reveal how matter behaves, how jets form, and how these systems evolve.',
			nl: 'Deze studentenmissie brengt innovatie samen met academische en industriële expertise. De hoge tijdresolutie en continue waarnemingen onthullen hoe materie zich gedraagt, hoe jets ontstaan en hoe deze systemen evolueren.',
		},
	},
}

// Without JavaScript every component and instrument part opens with one short
// sentence about what it does, taken from its approved text, before the
// deeper details; that sentence is then left out of the text below it.
// The X-ray instrument's text starts with the engineering challenge, so its
// sentence combines the approved descriptions of the optics and detectors.
const composedSummaries = {
	'x-ray-instrument': {
		en: "The instrument's mirrors focus incoming X-rays onto detectors that turn them into electrical signals.",
		nl: 'De spiegels van het instrument bundelen binnenkomende röntgenstraling op detectoren die haar omzetten in elektrische signalen.',
	},
}
// Which sentence of the first paragraph says what the part does (default 0)
const summarySentence = { 'star-tracker': 1 }
// Wording that only fits the 3D view, replaced on the page without it
const withoutScriptParagraphs = {
	'sun-sensor': [
		null,
		{
			en: 'The close-up shows one of the four Bison64 sun sensors.',
			nl: 'De close-up toont één van de vier Bison64-zonnesensoren.',
		},
	],
}

function sentences(text) {
	return text.match(/[^.!?]+[.!?]+(?:\s+|$)/g) ?? [text]
}

function addExhibit(item) {
	const location = componentViews.locations[item.id]
	if (location) {
		item.location = location
		const paragraphs = item.blocks.find(
			(block) => block.paragraphs,
		)?.paragraphs
		const variants = withoutScriptParagraphs[item.id] ?? []
		paragraphs?.forEach((paragraph, index) => {
			if (variants[index]) paragraph.withoutScript = variants[index]
		})
		if (composedSummaries[item.id]) {
			item.summary = composedSummaries[item.id]
		} else if (paragraphs?.[0]) {
			const index = summarySentence[item.id] ?? 0
			const first = paragraphs[0]
			// Start from the wording without JavaScript when there is one
			const source = first.withoutScript ?? first
			const split = { en: sentences(source.en), nl: sentences(source.nl) }
			item.summary = {
				en: split.en[index].trim(),
				nl: split.nl[index].trim(),
			}
			first.withoutScript = {
				en: split.en
					.filter((_, i) => i !== index)
					.join('')
					.trim(),
				nl: split.nl
					.filter((_, i) => i !== index)
					.join('')
					.trim(),
			}
		}
	}
	for (const child of item.children ?? []) addExhibit(child)
}

for (const item of explorerContent.children) addExhibit(item)

// How the parts of the X-ray instrument fit together: the map replaces the
// still of the opened instrument, and that branch starts open
const instrumentParts = explorerContent.children[0].children.find(
	(item) => item.id === 'instrument-components',
)
instrumentParts.openWithoutScript = true
instrumentParts.map = {
	image: '/media/components/instrument-map',
	anchors: componentViews.map.anchors,
	alt: {
		en: 'The X-ray instrument with its outer panels hidden, on a light background. Numbered labels name its seven groups of parts.',
		nl: 'Het röntgeninstrument zonder buitenpanelen, op een lichte achtergrond. Genummerde labels benoemen de zeven groepen onderdelen.',
	},
}

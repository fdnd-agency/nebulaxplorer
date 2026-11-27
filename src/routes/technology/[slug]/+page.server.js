import landscapeImage from '$lib/assets/images/test-dummy-landscape.png';
import portraitImage from '$lib/assets/images/test-dummy-portrait.png';

const tempDummyTechnology = {
  data: [
    {
      id: 1,
      name: "X-Ray Instrument",
      description: "The purpose of the NEBULA-Xplorer mission will be to study the quasi-periodic behavior of binary systems, by detecting their X-ray emissions. We aim to accomplish this by building a space telescope with an effective area of 200cm2 at 1 keV and 180cm2 at 6 keV as specified in Mission Requirements Specification SP-2025-045. Capturing these X-ray emissions is done by concentrating incoming light using mirrors onto silicon drift detectors on the focal plane of the mirrors. Due to the reflective behavior of X-rays it is only possible to deflect them at very shallow angles, which means that a single concentrator with sufficient effective area to meet the stated goal will result in a telescope with a prohibitively large focal length. To prevent this, it was decided that the instrument will house 10 concentrators with 2 reflections which each are 10 cm in diameter. A sketch of the methodology of the concentrator and the values of the concentrator can be found in Figure Instrument-7. These variables were then inserted in a model that generates the mirrors which results in 30 nested mirrors. The reflecting material is made of gold which is bound to an aluminum substrate with the use of a small layer of epoxy. More information on the design variable can be found in SRON-NEBULA-RP-2025-032 DA Optical This design results in sufficient performance while maintaining a short focal length of only 0.8m. This is of vital importance since it allows the mission to be launched on a cost effective SpaceX Rideshare mission. This, however, brings along many constraints. The small volume of the SpaceX Half Plate leaves very little room for the instrument and the rest of the spacecraft bus, making volumetric considerations of vital importance. Also, having an instrument that effectively contains 10 individual telescopes, makes the structural design of high importance, since all 10 telescopes need to be coaligned with each other, and stay aligned during all phases of the mission to ensure optimal observation performance. This is not only a challenge on the structure during launch, but also during operations, due to the thermal environment causing major temperature swings when the spacecraft enters and exits eclipse.",
      image: portraitImage,
      imageCredit: "Image: SRON",
      slug: "test1",
    },
    {
      id: 2,
      name: "X-Ray Instrument2",
      description: "The purpose of the NEBULA-Xplorer mission will be to study the quasi-periodic behavior of binary systems, by detecting their X-ray emissions. We aim to accomplish this by building a space telescope with an effective area of 200cm2 at 1 keV and 180cm2 at 6 keV as specified in Mission Requirements Specification SP-2025-045. Capturing these X-ray emissions is done by concentrating incoming light using mirrors onto silicon drift detectors on the focal plane of the mirrors. Due to the reflective behavior of X-rays it is only possible to deflect them at very shallow angles, which means that a single concentrator with sufficient effective area to meet the stated goal will result in a telescope with a prohibitively large focal length. To prevent this, it was decided that the instrument will house 10 concentrators with 2 reflections which each are 10 cm in diameter. A sketch of the methodology of the concentrator and the values of the concentrator can be found in Figure Instrument-7. These variables were then inserted in a model that generates the mirrors which results in 30 nested mirrors. The reflecting material is made of gold which is bound to an aluminum substrate with the use of a small layer of epoxy. More information on the design variable can be found in SRON-NEBULA-RP-2025-032 DA Optical This design results in sufficient performance while maintaining a short focal length of only 0.8m. This is of vital importance since it allows the mission to be launched on a cost effective SpaceX Rideshare mission. This, however, brings along many constraints. The small volume of the SpaceX Half Plate leaves very little room for the instrument and the rest of the spacecraft bus, making volumetric considerations of vital importance. Also, having an instrument that effectively contains 10 individual telescopes, makes the structural design of high importance, since all 10 telescopes need to be coaligned with each other, and stay aligned during all phases of the mission to ensure optimal observation performance. This is not only a challenge on the structure during launch, but also during operations, due to the thermal environment causing major temperature swings when the spacecraft enters and exits eclipse.",
      image: landscapeImage,
      imageCredit: "Image: SRON",
      slug: "test2",
    },
    {
      id: 3,
      name: "X-Ray Instrument3",
      description: "The purpose of the NEBULA-Xplorer mission will be to study the quasi-periodic behavior of binary systems, by detecting their X-ray emissions. We aim to accomplish this by building a space telescope with an effective area of 200cm2 at 1 keV and 180cm2 at 6 keV as specified in Mission Requirements Specification SP-2025-045. Capturing these X-ray emissions is done by concentrating incoming light using mirrors onto silicon drift detectors on the focal plane of the mirrors. Due to the reflective behavior of X-rays it is only possible to deflect them at very shallow angles, which means that a single concentrator with sufficient effective area to meet the stated goal will result in a telescope with a prohibitively large focal length. To prevent this, it was decided that the instrument will house 10 concentrators with 2 reflections which each are 10 cm in diameter. A sketch of the methodology of the concentrator and the values of the concentrator can be found in Figure Instrument-7. These variables were then inserted in a model that generates the mirrors which results in 30 nested mirrors. The reflecting material is made of gold which is bound to an aluminum substrate with the use of a small layer of epoxy. More information on the design variable can be found in SRON-NEBULA-RP-2025-032 DA Optical This design results in sufficient performance while maintaining a short focal length of only 0.8m. This is of vital importance since it allows the mission to be launched on a cost effective SpaceX Rideshare mission. This, however, brings along many constraints. The small volume of the SpaceX Half Plate leaves very little room for the instrument and the rest of the spacecraft bus, making volumetric considerations of vital importance. Also, having an instrument that effectively contains 10 individual telescopes, makes the structural design of high importance, since all 10 telescopes need to be coaligned with each other, and stay aligned during all phases of the mission to ensure optimal observation performance. This is not only a challenge on the structure during launch, but also during operations, due to the thermal environment causing major temperature swings when the spacecraft enters and exits eclipse.",
      image: null,
      imageCredit: null,
      slug: "test3",
    },
  ]
};

export function load({ params }) {
  const technology = tempDummyTechnology.data.find(
    item => item.slug === params.slug
  );

  return {
    technology
  };
}
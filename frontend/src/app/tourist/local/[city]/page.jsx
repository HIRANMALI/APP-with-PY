import guides from '@/data/guideData';
import GuideCards from '@/components/GuideCards';

export default function CityGuidePage({ params }) {
  const cityParam = params.city.toLowerCase();

  const filteredGuides = guides.filter(
    guide => guide.city.toLowerCase() === cityParam
  );

  return (
    <div>
      <h1>Guides in {params.city}</h1>
      <GuideCards guides={filteredGuides} />
    </div>
  );
}

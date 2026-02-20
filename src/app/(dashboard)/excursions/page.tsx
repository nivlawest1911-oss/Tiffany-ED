import { NodePlaceholder } from '@/components/sovereign/NodePlaceholder';
import { Map } from 'lucide-react';
import { SmartHover } from '@/components/ui/SmartHover';

export default function ExcursionsPage() {
    return (
        <SmartHover message="Transcend Excursions: Plan strategic field trips and explore virtual educational environments to expand the sovereign learning horizon.">
            <NodePlaceholder
                nodeName="Transcend Excursions"
                description="Field trip planning and virtual exploration."
                icon={<Map className="h-6 w-6" />}
            />
        </SmartHover>
    );
}

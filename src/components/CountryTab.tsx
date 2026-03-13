import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { useState } from 'react'
import LocationBadge from './LocationBadge'

export default function CountryTab() {
  const [activeCountry, setActiveCountry] = useState<'vietnam' | 'cambodia'>(
    'vietnam',
  )
  return (
    <Tabs defaultValue={activeCountry} className="w-full !h-[45px]">
      <TabsList className="w-full !h-[45px] p-[4px] flex items-center justify-center rounded-[30px] gap-[10px]">
        <TabsTrigger
          value="vietnam"
          className="rounded-[30px] !h-[37px]"
          onClick={() => setActiveCountry('vietnam')}
        >
          <LocationBadge
            location="Vietnam"
            disabled={!(activeCountry === 'vietnam')}
          />
        </TabsTrigger>
        <TabsTrigger
          value="cambodia"
          className="rounded-[30px] !h-[37px]"
          onClick={() => setActiveCountry('cambodia')}
          disabled
        >
          <LocationBadge
            location="Cambodia"
            disabled={!(activeCountry === 'cambodia')}
          />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vietnam">Vietnam content</TabsContent>
      <TabsContent value="cambodia">Cambodia content</TabsContent>
    </Tabs>
  )
}

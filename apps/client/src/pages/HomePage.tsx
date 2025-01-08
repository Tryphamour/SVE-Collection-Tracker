import Layout from '#src/components/layout';
import { Button } from '#src/components/ui/button';
import { Card } from '#src/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#src/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#src/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '#src/components/ui/select';
import { Toggle } from '#src/components/ui/toggle';
import { ChevronDown, Filter, Grid2X2, Grid3X3 } from 'lucide-react';
import { useState } from 'react';

function FilterDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <Filter size={24} className="mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
        <DropdownMenuItem>Option 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortSelect() {
  return (
    <Select>
      <SelectTrigger className="w-40">Sort</SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}

function LayoutToggle({
  layoutMode,
  setLayoutMode,
}: {
  layoutMode: 'gridSM' | 'gridLG';
  setLayoutMode: (mode: 'gridSM' | 'gridLG') => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Toggle
        pressed={layoutMode === 'gridSM'}
        onPressedChange={() => setLayoutMode('gridSM')}
      >
        <Grid2X2 size={24} />
      </Toggle>
      <Toggle
        pressed={layoutMode === 'gridLG'}
        onPressedChange={() => setLayoutMode('gridLG')}
      >
        <Grid3X3 size={24} />
      </Toggle>
    </div>
  );
}

const menuItems = [
  {
    title: 'Class',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    title: 'Card type',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    title: 'Trait',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
];

function CardMenu() {
  return (
    <Card className="p-4">
      {menuItems.map((item) => (
        <Collapsible key={item.title} defaultOpen>
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-3xl font-bold">{item.title}</h4>
            <CollapsibleTrigger>
              <ChevronDown size={24} />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="rounded-md px-4 py-3 text-xl ml-4">
              {item.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </Card>
  );
}

function CardList({ layoutMode }: { layoutMode: 'gridSM' | 'gridLG' }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-4 ${layoutMode === 'gridSM' ? 'grid grid-cols-2' : 'grid grid-cols-3'}`}
    >
      No Cards
    </div>
  );
}

export default function HomePage() {
  const [layoutMode, setLayoutMode] = useState<'gridSM' | 'gridLG'>('gridSM');
  return (
    <Layout>
      <div className="flex items-end justify-end h-full w-full space-x-2">
        <FilterDropdown />
        <SortSelect />
        <LayoutToggle layoutMode={layoutMode} setLayoutMode={setLayoutMode} />
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-1">
          <CardMenu />
        </div>
        <div className="col-span-3">
          <CardList layoutMode={layoutMode} />
        </div>
      </div>
    </Layout>
  );
}

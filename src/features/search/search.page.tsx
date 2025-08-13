import { PageLayout } from "@/shared/ui";
import { Input } from "@/shared/ui/kit/input";
import { Search } from "lucide-react";
import { usePersonalSearch } from "./model/use-personal-search";
import { useEffect, useState } from "react";
import { useDebounce } from "./model/use-debounce";
import { SearchTable } from "./ui/search-table";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { personals, isFetching, refetch } = usePersonalSearch({
    search: searchValue,
  });

  useEffect(() => {
    if (debouncedSearch) {
      refetch();
    }
  }, [debouncedSearch, refetch]);

  return (
    <PageLayout
      searchInput={
        <div className="flex w-full max-w-md items-center gap-1 rounded-xl border border-gray-200 py-1 px-4 shadow-sm hover:shadow-md">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Введите имя, фамилию..."
            className="border-none shadow-none bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      }
      title="Поиск персонала"
      children={
        <>
          <SearchTable isFetching={isFetching} data={personals} />
        </>
      }
    />
  );
};

export const Component = SearchPage;

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";

type SearchFormValues = {
  term: string;
};

function SearchForm() {
  const form = useForm({
    defaultValues: {
      term: "",
    } as SearchFormValues,
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <section className="max-w-[1440px] mx-auto mt-10">
      <form
        className="flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="term"
          asyncDebounceMs={500}
          validators={{
            onChangeAsync: async ({ value }) => {
              console.log(value);
            },
          }}
          children={(field) => (
            <div className="relative w-90 max-sm:w-full max-sm:mx-5">
              <SearchIcon
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <Input
                className="pl-8 "
                type="search"
                name="term"
                value={field.state.value}
                placeholder="Search"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
      </form>
    </section>
  );
}

export default SearchForm;

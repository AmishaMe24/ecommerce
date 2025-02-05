"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = ["Jeans", "Kurta"];

const gender = ["Women", "Men"];

const sizes = ["S", "M", "L"];

const colors = [
  "White",
  "Beige",
  "Blue",
  "Brown",
  "Green",
  "Purple",
  "Red",
  "Yellow",
  "Orange",
  "Black",
  "Gray",
  "Pink",
  "Gold",
  "Silver",
  "Maroon",
  "Multicolor",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);

  const [queryFilters, setQueryFilters] = useState({
    color: null,
    gender: null,
    category: null,
    size: null,
  });

  // Toggle gender selection
  const toggleGender = (gender) => {
    setSelectedGender((prev) =>
      prev.includes(gender) ? prev.filter((c) => c !== gender) : [...prev, gender]
    );

    setQueryFilters((prev) => ({
      ...prev,
      gender: selectedGender.includes(gender)
        ? selectedGender.filter((c) => c !== gender).join(",")
        : [...selectedGender, gender].join(","),
    }));
  };

  // Toggle color selection
  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

    setQueryFilters((prev) => ({
      ...prev,
      color: selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color).join(",")
        : [...selectedColors, color].join(","),
    }));
  };

  // Toggle subCategory selection
  const toggleSubCategory = (subCategory) => {
    setSelectedSubCategory((prev) =>
      prev.includes(subCategory) ? prev.filter((c) => c !== subCategory) : [...prev, subCategory]
    );

    setQueryFilters((prev) => ({
      ...prev,
      category: selectedSubCategory.includes(subCategory)
        ? selectedSubCategory.filter((c) => c !== subCategory).join(",")
        : [...selectedSubCategory, subCategory].join(","),
    }));
  };

  const limit = 8;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page,
        limit: 8,
        ...(queryFilters.color && { color: queryFilters.color }),
        ...(queryFilters.gender && { gender: queryFilters.gender }),
        ...(queryFilters.category && { category: queryFilters.category }),
        ...(queryFilters.size && { size: queryFilters.size }),
      });

      try {
        const res = await fetch(
          `http://localhost:8080/products?${queryParams.toString()}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (data.products.length === 0) throw new Error("No products found");
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, queryFilters]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <Disclosure
                  key="colors"
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Colors</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6 max-h-64 overflow-y-auto">
                    <div className="space-y-6">
                      {colors.map((color) => (
                        <div key={color} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`color-${color}`}
                            value={color}
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColor(color)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`color-${color}`}
                            className="ml-3 text-sm font-medium text-gray-700"
                          >
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block">

                {/*gender*/}
                <div className="space-y-2 pb-6">
                  {gender.map((sex) => (
                    <div key={sex} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`gender-${sex}`}
                        value={sex}
                        checked={selectedGender.includes(sex)}
                        onChange={() => toggleGender(sex)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`gender-${sex}`}
                        className="ml-3 text-sm font-medium text-gray-700"
                      >
                        {sex}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Colors */}
                <Disclosure
                  key="colors"
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Colors</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6 max-h-64 overflow-y-auto">
                    <div className="space-y-6">
                      {colors.map((color) => (
                        <div key={color} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`color-${color}`}
                            value={color}
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColor(color)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`color-${color}`}
                            className="ml-3 text-sm font-medium text-gray-700"
                          >
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>

                {/*sub Category*/}
                <div className="space-y-2 pb-2 border-t border-gray-200 py-6">
                  {subCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`subCategory-${category}`}
                        value={category}
                        checked={selectedSubCategory.includes(category)}
                        onChange={() => toggleSubCategory(category)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`subCategory-${category}`}
                        className="ml-3 text-sm font-medium text-gray-700"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4">
                {loading && (
                  <div className="my-4 text-center text-gray-500">
                    Loading...
                  </div>
                )}
                {error && (
                  <div className="my-4 text-center text-red-500">
                    Error: {error}
                  </div>
                )}

                {!loading && !error && (
                  <div className="bg-white">
                    <div className="max-w-2xl px-2 sm:px-4 lg:max-w-7xl lg:px-6">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                          <div key={product.id} className="group relative">
                            <img
                              alt={product.imageAlt}
                              src={product.imageUrl}
                              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {product.brand}
                                </p>
                                <h3 className="mt-1 text-sm text-gray-700">
                                  <a href={product.href}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />
                                    {product.title}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex justify-between items-baseline">
                                <p className="text-sm font-bold text-gray-900">
                                  {"₹ " + product.discountedPrice}
                                  <span className="px-2 text-sm text-gray-500 line-through">
                                    {"₹ " + product.price}
                                  </span>
                                  <span className="text-sm text-green-500">
                                    {product.discountPercent + "% off"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <Stack spacing={2} className="float-right mb-10">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </main>
      </div>
    </div>
  );
}

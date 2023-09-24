
<template>
  <div
    class="navbar-dropdown-wrapper"
    :class="{ open }"
  >
    <button
      class="navbar-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span
        v-if="treeHasNewAlerts"
        class="alert-circle"
      />
      <span class="title">{{ item.text }}</span>
      <span class="arrow down" />
    </button>

    <button
      class="navbar-dropdown-title-mobile"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <span class="title">{{ item.text }}</span>
      <span
        class="arrow"
        :class="open ? 'down' : 'right'"
      />
    </button>

    <DropdownTransition>
      <ul
        v-show="open"
        class="navbar-dropdown"
      >
        <li
          v-for="child in item.children"
          :key="child.text"
          class="navbar-dropdown-item"
        >
          <template v-if="child.children">
            <h4 class="navbar-dropdown-subtitle">
              <AutoLink
                v-if="child.link"
                :item="child"
                @focusout="
                  isLastItemOfArray(child, item.children) &&
                    child.children.length === 0 &&
                    (open = false)
                "
              />
              <span v-else>{{ child.text }}</span>
            </h4>

            <ul
              :class="`navbar-dropdown-subitem-wrapper ${getItemColumnsClass(child)}`"
            >
              <li
                v-for="grandchild in child.children"
                :key="grandchild.link"
                class="navbar-dropdown-subitem"
              >
                <AutoLink
                  :item="grandchild"
                  @focusout="
                    isLastItemOfArray(grandchild, child.children) &&
                      isLastItemOfArray(child, item.children) &&
                      (open = false)
                  "
                >
                  <template #after>
                    <Badge
                      v-if="hasAlert(grandchild) && isActiveAlert(grandchild.alert)"
                      v-bind="getAlert(grandchild.alert)"
                      vertical="middle"
                    />
                  </template>
                </AutoLink>
              </li>
            </ul>
          </template>

          <template v-else>
            <AutoLink
              :item="child"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script setup>
import AutoLink from '@theme/AutoLink.vue';
import DropdownTransition from '@theme/DropdownTransition.vue';
import {computed, ref, toRefs, watch} from 'vue';
import {useRoute} from 'vue-router';

const flattenTree = (items, collect = []) => {
  // break up children and items
  const {children, ...item} = items;
  // collec the item
  collect.push(item);
  // if we have children we need to recurse and add
  if (children && children.length > 0) {
    children.map(child => {
      collect.push(flattenTree(child));
    });
  };

  // faltten and return
  return collect.flat(Infinity);
};

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const {item} = toRefs(props);

const dropdownAriaLabel = computed(() => item.value.ariaLabel || item.value.text);
const treeHasNewAlerts = computed(() => {
  const items = flattenTree(item.value);
  const activeAlerts = items
    .filter(item => hasAlert(item))
    .map(item => getAlert(item.alert))
    .filter(alert => alert.type === 'new')
    .filter(alert => alert && alert.expires > new Date().getTime());

  return activeAlerts.length > 0;
});

const open = ref(false);
const route = useRoute();
watch(
  () => route.path,
  () => {
    open.value = false;
  },
);

const getAlert = alert => {
  if (typeof alert === 'string') alert = {text: alert};
  return {type: 'success', expires: 2000000000000, ...alert};
};

const isActiveAlert = alert => {
  const {expires} = getAlert(alert);
  return new Date().getTime() < expires;
};

/*
 * Open the dropdown when user tab and click from keyboard.
 *
 * Use event.detail to detect tab and click from keyboard.
 * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
 */
const handleDropdown = e => {
  const isTriggerByTab = e.detail === 0;
  if (isTriggerByTab) {
    open.value = !open.value;
  } else {
    open.value = false;
  }
};

const hasAlert = item => {
  const {alert} = item;
  return (
    alert
    && alert !== null
    && alert !== undefined
    && (typeof alert === 'string' || typeof alert == 'object')
  );
};

const isLastItemOfArray = (item, arr = []) =>
  arr[arr.length - 1] === item;

const getItemColumnsClass = item => {
  switch (item.columns) {
    case 1:
      return 'navbar-dropdown-columns-full';
    case 2:
      return 'navbar-dropdown-columns-half';
    case 3:
      return 'navbar-dropdown-columns-third';
    case 4:
      return 'navbar-dropdown-columns-quarter';
    default:
      return 'navbar-dropdown-columns-third';
  };
};
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.navbar-dropdown-wrapper:not(.mobile) {
  display: flex;
  flex-wrap: wrap;
  .navbar-dropdown-title:not(.mobile) {
    .alert-circle {
      height: 10px;
      width: 10px;
      background-color: var(--c-brand);
      border-radius: 50%;
      display: inline-block;
      margin-right: 3px;
    }
  }
  .navbar-dropdown-subitem-wrapper:not(.mobile) {
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    li {
      padding: 5px;
      .badge {
        margin-bottom: 2px;
      }
    }
    &.navbar-dropdown-columns-full {
      li {
        width: 90%;
      }
    }
    &.navbar-dropdown-columns-half {
      li {
        width: 42%;
      }
    }
    &.navbar-dropdown-columns-third {
      li {
        width: 29%;
      }
    }
    &.navbar-dropdown-columns-quarter {
      li {
        width: 21%;
      }
    }
  }
}
</style>
